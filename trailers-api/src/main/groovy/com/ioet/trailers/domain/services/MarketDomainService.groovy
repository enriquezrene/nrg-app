package com.ioet.trailers.domain.services

import com.google.firebase.database.DataSnapshot
import com.google.firebase.database.DatabaseError
import com.google.firebase.database.DatabaseReference
import com.google.firebase.database.ValueEventListener
import com.ioet.trailers.domain.Market
import com.ioet.trailers.firebase.FireBaseRoot
import groovy.transform.CompileStatic
import org.springframework.stereotype.Component

/**
 * Created by moe on 10/11/16.
 */
@Component
@CompileStatic
class MarketDomainService {

    DatabaseReference rootRef
    DatabaseReference marketsRef

    public MarketDomainService(){
        rootRef = FireBaseRoot.instance.rootReference
        marketsRef = rootRef.child("markets");
    }

    String save(Market market){
        DatabaseReference newMarketRef = marketsRef.push()
        newMarketRef.setValue(market)
        return newMarketRef.key
    }

}
