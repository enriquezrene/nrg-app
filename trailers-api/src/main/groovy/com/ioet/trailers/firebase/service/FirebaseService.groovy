package com.ioet.trailers.firebase.service

import com.google.firebase.database.DatabaseReference
import com.ioet.trailers.firebase.query.QueryProvider
import groovy.transform.CompileStatic
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.stereotype.Component

/**
 * Created by rene on 12/10/16.
 */
@CompileStatic
@Component
class FirebaseService {

    @Autowired
    FirebaseRoot firebaseRoot


    DatabaseReference root(){
        return this.firebaseRoot.root()
    }

    DatabaseReference child(String path){
        return firebaseRoot.child(path)
    }

    /**
     * Get a query builder. This is the most complete way to get data.
     *
     * @param path the path to the data
     *
     * @return a new query builder
     */
    QueryProvider getQueryBuilder(String path) {
        return new QueryProvider(child(path))
    }

    /**
     * Convenience method for a simple getter at the given path.
     *
     * @param path the path
     * @param type the type
     *
     * @return the value
     */
    public <T> T getAs(String path, Class<T> type) {
        return getQueryBuilder(path).getValue(type)
    }

    /**
     * Convenience method for putting a value at the given path.
     *
     * @param path the path
     * @param value the value
     */
    void put(String path, Object value) {
        root.child(path).setValue(value)
    }

    /**
     * Convenience method for deleting a value at a given path.
     *
     * @param path the path
     */
    void delete(String path) {
        root.child(path).removeValue()
    }

    /**
     * Add a new value under the given path.
     *
     * @param path the path under which to add the value
     * @param value the value
     *
     * @return the index or key that was used to push the value
     */
    String push(String path, Object value) {
        Firebase created = root.child(path).push()
        created.setValue(value)
        return created.key
    }

    /**
     * Create a new transaction handler of the given type.
     *
     * @param type the type
     * @return the new handler
     */
    public <T extends AbstractTransaction> T createTransaction(Class<T> type) {
        T handler = (T) type.newInstance()
        handler.firebaseService = this
        return handler
    }

    /**
     * Create a new child listener for the given path where the child nodes conform to the given type. The listeners
     * will be invoke with the key and the deserialized form of the value as appropriate.  This just returns the builder
     * it must be explicitly started.
     *
     * @param path the path whose children should be listened to
     * @param type the type of data for the children
     *
     * @return the ChildListener builder pattern object
     */
    public <T> ChildListener<T> createChildListener(String path, Class<T> type) {
        return new ChildListener<T>(this, path, type)
    }
}
