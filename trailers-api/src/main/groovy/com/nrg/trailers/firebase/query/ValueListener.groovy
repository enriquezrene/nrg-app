package com.nrg.trailers.firebase.query

import com.google.firebase.database.DataSnapshot
import com.google.firebase.database.DatabaseError
import com.google.firebase.database.ValueEventListener
import com.nrg.trailers.domain.Market
import groovy.transform.CompileStatic

@CompileStatic
class ValueListener<T> implements ValueEventListener {

    String path
    Class<T> type

    boolean done = false
    T value = null
    DatabaseError error

    @Override
    synchronized void onDataChange(DataSnapshot dataSnapshot) {
        value = (T)dataSnapshot.getValue()
        this.done = true
        this.notifyAll()
    }

    @Override
    void onCancelled(DatabaseError databaseError) {
        this.error = databaseError
    }

    /**
     * Actually get the value
     *
     * @param timeout the maximum amount of time to wait
     *
     * @return the value returned
     */
    synchronized T getValue(long timeout = 10000) {
        /* First check for synchronous response */
        if (done) {
            return value
        } else if (error) {
            throw new IOException("Firebase Value Error: ${error.message}, ${error.details}")
        }

        for (int i = 1000; i <= timeout; i += 1000) {
            /* Not there yet, wait and then return */
            this.wait(Math.max(1, timeout))
            if (done) {
                break
            }
        }

        /* Check again but if there is no error, it is a timeout */
        if (done) {
            return value
        } else if (error) {
            throw new IOException("Firebase Value Error: ${error.message}, ${error.details}")
        } else {
            throw new IOException("Firebase Read Timeout: ${path}")
        }
    }
}
