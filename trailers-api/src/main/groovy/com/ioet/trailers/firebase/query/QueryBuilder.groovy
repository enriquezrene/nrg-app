package com.ioet.trailers.firebase.query

import com.google.firebase.database.Query
import com.ioet.trailers.firebase.service.FirebaseRoot
import groovy.transform.CompileStatic
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.stereotype.Component

/**
 * Created by rene on 12/10/16.
 */
@CompileStatic
@Component
class QueryBuilder {

    @Autowired
    private FirebaseRoot firebaseRoot

    private Query query

    def QueryBuilder(String path) {
        Query query = firebaseRoot.child(path)
    }

    Query build() {
        return query
    }
}
