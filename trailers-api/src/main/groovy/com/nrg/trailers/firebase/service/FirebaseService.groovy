package com.nrg.trailers.firebase.service

import com.google.firebase.database.DatabaseReference
import com.google.firebase.database.Query
import com.nrg.trailers.firebase.listeners.ChildListener
import com.nrg.trailers.firebase.query.QueryResult
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
    FirebaseRoot root

    DatabaseReference child(String path) {
        return root.child(path)
    }

    Query createQuery(String path){
        return child(path)
    }

    public <T> T getAs(String path, Class<T> type) {
        Query query = createQuery(path)
        return new QueryResult(query).getValue(type)
    }

    void put(String path, Object value) {
        root.child(path).setValue(value)
    }

    void delete(String path) {
        root.child(path).removeValue()
    }

    String push(String path, Object value) {
        DatabaseReference created = root.child(path).push()
        created.setValue(value)
        return created.key
    }

    public <T> ChildListener<T> createChildListener(String path, Class<T> type) {
        return new ChildListener<T>(this, path, type)
    }

    void reset() {
        root.reset()
    }


}
