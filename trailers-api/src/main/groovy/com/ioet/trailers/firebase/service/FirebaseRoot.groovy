package com.ioet.trailers.firebase.service

import com.google.firebase.FirebaseApp
import com.google.firebase.FirebaseOptions
import com.google.firebase.database.DatabaseReference
import com.google.firebase.database.FirebaseDatabase
import groovy.transform.CompileStatic
import org.springframework.stereotype.Component

import javax.annotation.PostConstruct

/**
 * Created by rene on 12/10/16.
 */
@CompileStatic
@Component
class FirebaseRoot {

    FirebaseDatabase fireBaseDatabase
    DatabaseReference rootReference

    @PostConstruct
    public void init(){
        FirebaseOptions options = new FirebaseOptions.Builder()
                .setServiceAccount(new FileInputStream("src/main/resources/firebase-spring-boot-babbd2ea2d76.json"))
                .setDatabaseUrl("https://fir-spring-boot.firebaseio.com/")
                .build();
        FirebaseApp fireBaseApp = FirebaseApp.initializeApp(options);
        fireBaseDatabase = FirebaseDatabase.getInstance(fireBaseApp)
        rootReference = fireBaseDatabase.getReference("tempura")
    }

    DatabaseReference root(){
        return this.rootReference
    }

    DatabaseReference child(String path){
        return this.rootReference.child(path)
    }

}

//package com.ioet.trailers.firebase.service
//
//import com.google.firebase.FirebaseApp
//import com.google.firebase.FirebaseOptions
//import com.google.firebase.database.DatabaseReference
//import com.google.firebase.database.FirebaseDatabase
//import com.google.firebase.database.Query
//import com.ioet.trailers.firebase.query.ValueListener
//import groovy.transform.CompileStatic
//import org.springframework.stereotype.Component
//
///**
// * Created by rene on 12/10/16.
// */
//@CompileStatic
//@Component
//class FirebaseRoot {
//
//    FirebaseDatabase fireBaseDatabase
//    DatabaseReference rootReference
//
//    public FirebaseRoot(){
//        FirebaseOptions options = new FirebaseOptions.Builder()
//                .setServiceAccount(new FileInputStream("src/main/resources/firebase-spring-boot-babbd2ea2d76.json"))
//                .setDatabaseUrl("https://fir-spring-boot.firebaseio.com/")
//                .build();
//        FirebaseApp fireBaseApp = FirebaseApp.initializeApp(options);
//        fireBaseDatabase = FirebaseDatabase.getInstance(fireBaseApp)
//        rootReference = fireBaseDatabase.getReference("tempura")
//    }
//
//    DatabaseReference root(){
//        return this.rootReference
//    }
//
//    DatabaseReference child(String path){
//        return this.rootReference.child(path)
//    }
//
//    Query createQuery(String path){
//        return child(path)
//    }
//
//    public <T> T findOne(String path, Class<T> type) {
//        ValueListener<T> listener = new ValueListener(path: path, type: type)
//        Query query = createQuery(path)
//
//        query.addListenerForSingleValueEvent(listener)
//        listener.
////        return query.get
//
////        query.addListenerForSingleValueEvent(listener)
////        return listener.getValue()
////        return createQuery(path).getValue(type)
//        return null
//    }
//
//}
