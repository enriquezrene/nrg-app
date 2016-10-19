package com.nrg.trailers.controllers

import com.google.gson.Gson
import com.nrg.trailers.domain.Theater
import com.nrg.trailers.services.domain.TheaterDomainService
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
@RequestMapping(value = "/trailers/v1/theaters")
class TheaterController {

    @Autowired
    TheaterDomainService theaterDomainService

    @Autowired
    Gson gson

    @RequestMapping(value = "/{marketId}", method = RequestMethod.POST)
    ResponseEntity<String> create(@PathVariable("marketId") String marketId, @RequestBody Theater theater) {
        String theaterId = theaterDomainService.create(marketId, theater)
        return new ResponseEntity<String>(theaterId, HttpStatus.CREATED)
    }

    @RequestMapping(value = "/{marketId}/{theaterId}", method = RequestMethod.PUT)
    ResponseEntity<Void> update(@PathVariable("marketId") String marketId, @PathVariable("theaterId") String theaterId, @RequestBody Theater theater) {
        theaterDomainService.update(marketId, theaterId, theater)
        return new ResponseEntity<Void>(HttpStatus.OK)
    }

    @RequestMapping(method = RequestMethod.GET)
    ResponseEntity<List> list(@RequestParam("marketId") String marketId) {
        Theater.Collection collection = theaterDomainService.list(marketId)
        List list = collection?.toArray(gson, true, "theaterId")
        return new ResponseEntity<List>(list, HttpStatus.OK)
    }

    @RequestMapping(value = "/{marketId}/{theaterId}", method = RequestMethod.DELETE)
    ResponseEntity<Theater> delete(@PathVariable("marketId") String marketId, @PathVariable("theaterId") String theaterId) {
        theaterDomainService.delete(marketId, theaterId)
        return new ResponseEntity<Theater>(HttpStatus.OK)
    }
}
