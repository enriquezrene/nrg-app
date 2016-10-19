package com.nrg.trailers.firebase.domain

import com.google.gson.Gson
import com.google.gson.JsonArray
import com.google.gson.JsonElement
import groovy.transform.CompileStatic

/**
 * Created by rene on 19/10/16.
 */
@CompileStatic
abstract class FirebaseCollection<T> extends HashMap<String, T> {

    List<T> asList() {
        return this.values().asList()
    }

    List<Map<String, Object>> toArray(Gson gson, boolean transposeIndex = false, String indexKey = '$key') {
        List<Map<String, Object>> array = new ArrayList();
        JsonArray jsonArray = getAsJsonArray(gson, transposeIndex, indexKey)
        for(final JsonElement element : jsonArray) {
            array.add(gson.fromJson(element, Map.class))
        }
        return array
    }

    String toJson(Gson gson) {
        return gson.toJson(this)
    }

    String toJsonArray(Gson gson, boolean transposeIndex = false, String indexKey = '$key') {
        JsonArray array = getAsJsonArray(gson, transposeIndex, indexKey)
        return gson.toJson(array)
    }

    JsonArray getAsJsonArray(Gson gson, boolean transposeIndex, String indexKey) {
        JsonArray array = new JsonArray();
        this.each { String key, T val ->
            JsonElement element = gson.toJsonTree(val);
            if (transposeIndex && element.isJsonObject()) {
                element.asJsonObject.addProperty(indexKey, key)
            }
            array.add(element)
        }
        return array
    }

    Map.Entry<String, T> first() {
        return this.entrySet().first()
    }

    FirebaseCollection<T> subCollection(int fromIndex, int toIndex) {
        FirebaseCollection<T> subCollection = (FirebaseCollection<T>)this.getClass().newInstance();
        this.eachWithIndex { key, value, int index -> isBetween(fromIndex, toIndex, index) ? subCollection[key] = value : null }
        return subCollection
    }

    boolean isBetween(int start, int finish, int number) {
        boolean isMajorOrEqualsToStart = number >= start
        boolean isMinorOrEqualsToFinish = number <= finish
        return isMajorOrEqualsToStart && isMinorOrEqualsToFinish;
    }

    FirebaseCollection<T> applyFilter(String fieldName, Object fieldValue) {
        FirebaseCollection<T> filteredCollection = (FirebaseCollection<T>)this.getClass().newInstance();
        Map filteredMap = this.findAll {key, value -> value[fieldName]==fieldValue}
        filteredCollection.putAll(filteredMap)
        return filteredCollection
    }
}
