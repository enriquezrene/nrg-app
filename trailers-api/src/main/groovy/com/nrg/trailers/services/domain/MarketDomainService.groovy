package com.nrg.trailers.services.domain

import com.nrg.trailers.domain.Market
import com.nrg.trailers.firebase.service.FirebaseService
import com.nrg.trailers.exceptions.BadRequestException
import groovy.transform.CompileStatic
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.stereotype.Component

import javax.annotation.PostConstruct

/**
 * Created by rene on 19/10/16.
 */
@CompileStatic
@Component
class MarketDomainService {

    @Autowired
    FirebaseService firebaseService

    Market.Collection markets = new Market.Collection()

    @PostConstruct
    void initialize() {
        firebaseService.createChildListener('/markets', Market)
                .mappedToCollection(markets)
                .withAutomaticRestart()
                .start()
    }

    String create(Market market) {
        if (!market) {
            throw new BadRequestException('Missing market')
        }  else if (market.name == null && market.country == null) {
            throw new BadRequestException("Provide values for name/country")
        }
        return firebaseService.push('markets', market)
    }

    void update(String marketId, Market market) {
        if (!marketId || marketId == '') {
            throw new BadRequestException('Invalid Market Id')
        } else if (!market) {
            throw new BadRequestException('Missing market')
        }

        firebaseService.put("markets/${marketId}", market);
    }

    void delete(String marketId) {
        if (!marketId || marketId == '') {
            throw new BadRequestException('Invalid Market Id')
        }
        firebaseService.delete("markets/${marketId}");
    }

    Market.Collection getAll() {
        return markets
    }

    Market getById(String marketId) {
        return markets[marketId]
    }
}
