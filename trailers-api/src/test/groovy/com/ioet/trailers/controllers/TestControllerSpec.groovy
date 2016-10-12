package com.ioet.trailers.controllers

import spock.lang.Specification

/**
 * Created by moe on 10/11/16.
 */
class TestControllerSpec extends Specification {

    def 'must return a plain hello'(){
        when:
        def message = new TestController().sayHello();

        then:
        message == "Hello"
    }
}
