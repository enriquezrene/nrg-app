package com.nrg.trailers.controllers

import com.google.gson.Gson
import com.nrg.trailers.domain.Market
import com.nrg.trailers.services.domain.MarketDomainService
import groovy.transform.CompileStatic
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.http.HttpStatus
import org.springframework.http.ResponseEntity
import org.springframework.web.bind.annotation.*

/**
 * Created by rene on 19/10/16.
 */
@CompileStatic
@RestController
@RequestMapping(value = "/trailers/v1/markets")
class MarketController {

    @Autowired
    MarketDomainService marketDomainService


    @Autowired
    Gson gson

    @RequestMapping(method = RequestMethod.POST)
    ResponseEntity<String> create(@RequestBody Market market) {
        String marketId = marketDomainService.create(market)
        return new ResponseEntity<String>(marketId, HttpStatus.CREATED)
    }

    @RequestMapping(value = "/{marketId}", method = RequestMethod.PUT)
    ResponseEntity<Void> update(@PathVariable("marketId") String marketId, @RequestBody Market market) {
        marketDomainService.update(marketId, market)
        return new ResponseEntity<Void>(HttpStatus.OK)
    }

    @RequestMapping(method = RequestMethod.GET)
    ResponseEntity<List> list() {
        Market.Collection collection = marketDomainService.getAll()
        List list = collection?.toArray(gson, true, "marketId")
        return new ResponseEntity<List>(list, HttpStatus.OK)
    }


    @RequestMapping(value = "/{marketId}", method = RequestMethod.GET)
    ResponseEntity<Market> get(@PathVariable("marketId") String marketId) {
        Market market = marketDomainService.getById(marketId)
        return new ResponseEntity<Market>(market, HttpStatus.OK)
    }

    @RequestMapping(value = "/{marketId}", method = RequestMethod.DELETE)
    ResponseEntity<Market> delete(@PathVariable("marketId") String marketId) {
        marketDomainService.delete(marketId)
        return new ResponseEntity<Market>(HttpStatus.OK)
    }
}
