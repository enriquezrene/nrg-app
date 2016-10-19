package com.nrg.trailers.firebase.listeners

import com.google.firebase.database.ChildEventListener
import com.google.firebase.database.DataSnapshot
import com.google.firebase.database.DatabaseError
import com.google.firebase.database.DatabaseReference
import com.nrg.trailers.firebase.domain.FirebaseCollection
import com.nrg.trailers.firebase.service.FirebaseService
import groovy.transform.CompileStatic
import org.apache.log4j.Logger

import java.util.concurrent.TimeUnit

/**
 * Created by rene on 19/10/16.
 */
@CompileStatic
class ChildListener<T> {

    static Logger logger = Logger.getLogger(ChildListener)

    FirebaseService service
    String path
    Class<T> type

    /* Delay between trying to re-establish connections, defaults to 30 seconds */
    long timeout = TimeUnit.SECONDS.toMillis(30)

    InnerListener innerListener = new InnerListener()
    List<Closure> addListeners = []
    List<Closure> changeListeners = []
    List<Closure> removeListeners = []
    List<Closure> cancelListners = []

    /**
     * Constructor for creating a new ChildListener
     *
     * @param service the firebase service that the child node should be gathered from
     * @param path the path of the parent node
     * @param type the type of data at the child nodes
     */
    ChildListener(FirebaseService service, String path, Class<T> type) {
        this.service = service;
        this.path = path
        this.type = type
    }

    /**
     * Start listening to the given parent node for changes.  This happens asynchronously and will continuously retry
     * every 30 seconds until it finally connects.
     */
    ChildListener start() {
        new Thread({
            while (true) {
                try {
                    DatabaseReference node = service.child(path)
                    node.addChildEventListener(innerListener)
                    return
                } catch (Exception ex) {
                    logger.error("Failed to listen for changes, waiting ${timeout} ms before trying again", ex)
                }

                Thread.sleep(timeout)
            }
        }).start()

        return this
    }

    /**
     * Anytime this listener receives a cancelled event, automatically call the start method.
     *
     * @return this
     */
    ChildListener withAutomaticRestart() {
        this.onCancelled {
            service.reset()
            this.start()
        }
    }

    /**
     * Add a listener that will be invoked every time a new child node is added. The parameters passed to the closure
     * will be the key and the de-serialized value (of the given type).
     *
     * @param closure the function to invoke
     * @return this
     */
    ChildListener onAdded(Closure closure) {
        addListeners << closure
        return this
    }

    /**
     * Add a listener that will be invoked every time a child node changes. The parameters passed to the closure
     * will be the key and the de-serialized value (of the given type).
     *
     * @param closure the function to invoke
     * @return this
     */
    ChildListener onChanged(Closure closure) {
        changeListeners << closure
        return this
    }

    /**
     * Convenience function to add a listener that will be invoked every time a new child node is added or changed.
     * The parameters passed to the closure will be the key and the de-serialized value (of the given type). This
     * simply calls onAdded and onChanged with the same closure.
     *
     * @param closure the function to invoke
     * @return this
     */
    ChildListener onAddedOrChanged(Closure closure) {
        return onAdded(closure).onChanged(closure)
    }

    /**
     * Convenience function for managing a FirebaseCollection of the given type.  This handles all additions,
     * modifications and removals and reflects them directly in the collection.  Note that this does not include
     * making this automatically restart or start.
     *
     * @param collection the collection to update on updates
     * @return this
     */
    ChildListener mappedToCollection(FirebaseCollection<T> collection) {
        onAddedOrChanged({ String key, T value -> collection[key] = value })
        onRemoved({ String key -> collection.remove(key) })

        return this
    }

    /**
     * Add a listener that will be invoked every time a child node is removed. Only the key associated with the child
     * will be passed to the closure.
     *
     * @param closure the function to invoke
     * @return this
     */
    ChildListener onRemoved(Closure closure) {
        removeListeners << closure
        return this
    }

    /**
     * Add a listener that will be invoked every this listener is cancelled. The FirebaseError that was generated
     * when the listener was cancelled will be passed to the listener.
     *
     * @param closure the function to invoke
     * @return this
     */
    ChildListener onCancelled(Closure closure) {
        cancelListners << closure
        return this
    }

    /**
     * Semi-private inner listener that maps the Firebase callbacks into the callbacks that were added taking care
     * of the deserialization as appropriate.
     *
     */
    class InnerListener implements ChildEventListener {

        /**
         * {@inheritDoc}
         */
        @Override
        void onChildAdded(DataSnapshot snapshot, String previousChildName) {
            logger.trace("Child Added: ${snapshot.key}")

            String key = snapshot.key
            T value = snapshot.getValue(type)
            addListeners.each { it.call(key, value) }
        }

        /**
         * {@inheritDoc}
         */
        @Override
        void onChildChanged(DataSnapshot snapshot, String previousChildName) {
            logger.trace("Child Changed: ${snapshot.key}")

            String key = snapshot.key
            T value = snapshot.getValue(type)
            changeListeners.each { it.call(key, value) }
        }

        /**
         * {@inheritDoc}
         */
        @Override
        void onChildRemoved(DataSnapshot snapshot) {
            logger.trace("Child Removed: ${snapshot.key}")

            String key = snapshot.key
            removeListeners.each { it.call(key) }
        }

        /**
         * {@inheritDoc}
         */
        @Override
        void onChildMoved(DataSnapshot snapshot, String previousChildName) {
            logger.warn("Child Moved: ${snapshot.key}. This is ignored!")
        }

        /**
         * {@inheritDoc}
         */
        @Override
        void onCancelled(DatabaseError error) {
            logger.error("Child listener cancelled: " + error.message)
            cancelListners.each { it.call(error) }
        }
    }
}