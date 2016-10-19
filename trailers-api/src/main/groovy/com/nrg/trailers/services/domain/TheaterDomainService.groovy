package com.nrg.trailers.services.domain

import com.google.firebase.database.Query
import com.nrg.trailers.domain.Theater
import com.nrg.trailers.exceptions.BadRequestException
import com.nrg.trailers.firebase.query.QueryResult
import com.nrg.trailers.firebase.service.FirebaseService
import groovy.transform.CompileStatic
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.stereotype.Component

/**
 * Created by rene on 19/10/16.
 */
@CompileStatic
@Component
class TheaterDomainService {

    @Autowired
    FirebaseService firebaseService

    String create(String marketId, Theater theater) {
        if (!theater) {
            throw new BadRequestException('Missing theater')
        }
        return firebaseService.push("theaters/${marketId}", theater)
    }

    void update(String marketId, String theaterId, Theater theater) {
        if (!theaterId || theaterId == '') {
            throw new BadRequestException('Invalid theater Id')
        } else if(!marketId || marketId == ''){
            throw new BadRequestException('Invalid market Id')
        } else if (!theater) {
            throw new BadRequestException('Missing theater')
        }

        firebaseService.put("theaters/${marketId}/${theaterId}", theater);
    }

    void delete(String marketId, String theaterId) {
        if (!theaterId || theaterId == '') {
            throw new BadRequestException('Invalid Theater Id')
        } else if(!marketId || marketId == ''){
            throw new BadRequestException('Invalid market Id')
        }
        firebaseService.delete("theaters/${marketId}/${theaterId}");
    }

    Theater.Collection list(String marketId) {
        if (!marketId) {
            throw new BadRequestException('Missing marketId query parameters')
        }
        Query query = firebaseService.createQuery("/theaters/${marketId}")
        Theater.Collection collection = new QueryResult(query).getValue(Theater.Collection)
        return collection
    }

}
