package com.nrg.trailers.firebase.query

import com.google.firebase.database.Query
import groovy.transform.CompileStatic

/**
 * Created by rene on 12/10/16.
 */
@CompileStatic
class QueryResult {

    private Query query

    public QueryResult(Query query) {
        this.query = query
    }

    public <T> T getValue(Class<T> type) {
        ValueListener<T> listener = new ValueListener(path: query.getPath().toString(), type: type)
        query.addListenerForSingleValueEvent(listener)
        return listener.getValue()
    }
}
