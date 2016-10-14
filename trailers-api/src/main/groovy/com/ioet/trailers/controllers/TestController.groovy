package com.ioet.trailers.controllers

import org.springframework.web.bind.annotation.RequestMapping
import org.springframework.web.bind.annotation.RequestMethod
import org.springframework.web.bind.annotation.RestController

/**
 * Created by moe on 10/11/16.
 */
@RestController
@RequestMapping('/trailers/v1/test')
class TestController {


    @RequestMapping(method = RequestMethod.GET)
    String sayHello() {
        return "Hello"
    }
}
