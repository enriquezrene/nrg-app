package com.ioet.trailers.domain.services

import com.ioet.trailers.domain.Market
import spock.lang.Specification

/**
 * Created by moe on 10/11/16.
 */
class MarketDomainServiceSpec extends Specification{

    def 'after save a market a not null value should be returned'(){
        given:
        Market market = new Market(location: 'Quito', name: 'My Market')

        when:
        def response = new MarketDomainService().save(market)

        then:
        response!=null
    }

    def 'on query market a not empty list should be returned'(){
        when:
        Collection<Market> markets = new MarketDomainService().getAll()

        then:
        !markets.isEmpty()

    }
}
