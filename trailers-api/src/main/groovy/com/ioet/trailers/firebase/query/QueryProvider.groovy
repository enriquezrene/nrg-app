package com.ioet.trailers.firebase.query

import com.google.firebase.database.DatabaseReference
import com.google.firebase.database.Query

/**
 * Created by rene on 12/10/16.
 */
class QueryProvider {

    private Query query

    QueryProvider(DatabaseReference reference) {
        query = (Query) reference
    }

    Query getQuery(){
        return query
    }
//
//    /**
//     * Indicates that this query is ordered (or indexed) by the given child key.
//     *
//     * @param childKey the key to index off of
//     * @return this
//     */
//    QueryProvider orderByChild(String childKey) {
//        query = query.orderByChild(childKey)
//        return this
//    }
//
//    /**
//     * Indicates that this query is ordered (or indexed) by the key itself. This is always a string so
//     * callers should use the String versions of the query language.
//     *
//     * @return this
//     */
//    QueryProvider orderByKey() {
//        query = query.orderByKey()
//        return this
//    }
//
//    /**
//     * Only include responses whose value at the given "orderBy" are greater than or equal to the given value.
//     *
//     * @param value the value
//     * @return this
//     */
//    QueryProvider startAt(double value) {
//        query = query.startAt(value)
//        return this
//    }
//
//    /**
//     * Only include responses whose value at the given "orderBy" are greater than or equal to the given value.
//     *
//     * @param value the value
//     * @return this
//     */
//    QueryProvider startAt(String value) {
//        query = query.startAt(value)
//        return this
//    }
//
//    /**
//     * Only include responses whose value at the given "orderBy" are less than or equal to the given value.
//     *
//     * @param value the value
//     * @return this
//     */
//    QueryProvider endAt(double value) {
//        query = query.endAt(value)
//        return this
//    }
//
//    /**
//     * Only include responses whose value at the given "orderBy" are less than or equal to the given value.
//     *
//     * @param value the value
//     * @return this
//     */
//    QueryProvider endAt(String value) {
//        query = query.endAt(value)
//        return this
//    }
//
//    /**
//     * Only include responses whose value at the given "orderBy" are equal to the given value.
//     *
//     * @param value the value
//     * @return this
//     */
//    QueryProvider equalTo(double value) {
//        query = query.equalTo(value)
//        return this
//    }
//
//    /**
//     * Only include responses whose value at the given "orderBy" are equal to the given value.
//     *
//     * @param value the value
//     * @return this
//     */
//    QueryProvider equalTo(String value) {
//        query = query.equalTo(value)
//        return this
//    }
//
//    /**
//     * Limit the response to only a certain number of responses starting at the beginning.
//     *
//     * @param limit the maximum number of responses
//     * @return this
//     */
//    QueryProvider limitToFirst(int limit) {
//        query = query.limitToFirst(limit)
//        return this
//    }
//
//    /**
//     * Limit the response to only a certain number of responses starting at the end.
//     *
//     * @param limit the maximum number of responses
//     * @return this
//     */
//    QueryProvider limitToLast(int limit) {
//        query = query.limitToLast(limit)
//        return this
//    }

    /**
     * Synchronously get the value of the query as it has been built.
     *
     * @param type the type of response used for deserealization
     * @return the value
     */
    public <T> T getValue(Class<T> type) {
        ValueListener<T> listener = new ValueListener(path: query.getPath().toString(), type: type)
        query.addListenerForSingleValueEvent(listener)
        return listener.getValue()
    }
}
