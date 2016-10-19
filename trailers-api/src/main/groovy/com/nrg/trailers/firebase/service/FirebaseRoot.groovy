package com.nrg.trailers.firebase.service

import com.google.firebase.FirebaseApp
import com.google.firebase.FirebaseOptions
import com.google.firebase.database.DataSnapshot
import com.google.firebase.database.DatabaseError
import com.google.firebase.database.DatabaseReference
import com.google.firebase.database.FirebaseDatabase
import com.google.firebase.database.ValueEventListener
import groovy.transform.CompileStatic
import org.springframework.stereotype.Component

import javax.annotation.PostConstruct

/**
 * Created by rene on 12/10/16.
 */
@CompileStatic
@Component
class FirebaseRoot {

    private FirebaseDatabase fireBaseDatabase
    private DatabaseReference rootReference


    @PostConstruct
    public void init() {
        FirebaseOptions options = new FirebaseOptions.Builder()
                .setServiceAccount(new FileInputStream("src/main/resources/nrg-app-3169dd84698c.json"))
                .setDatabaseUrl("https://nrg-app-56be9.firebaseio.com/")
                .build();
        FirebaseApp fireBaseApp = FirebaseApp.initializeApp(options);
        fireBaseDatabase = FirebaseDatabase.getInstance(fireBaseApp)
        rootReference = fireBaseDatabase.getReference('/trailers/v1')
    }

    DatabaseReference root() {
        return this.rootReference
    }

    DatabaseReference child(String path) {
        return this.rootReference.child(path)
    }

    void reset() {
        init()
    }
}
