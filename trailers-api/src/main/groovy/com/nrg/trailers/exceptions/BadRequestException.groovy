package com.nrg.trailers.exceptions

/**
 * Created by rene on 19/10/16.
 */
class BadRequestException extends Exception {

    int status = 400
    boolean messageShown = true

    /**
     * Constructor
     *
     * @param message the message
     */
    BadRequestException(String message) {
        super(message)
    }

    /**
     * Constructor
     *
     * @param message the message
     * @param cause the cause
     */
    BadRequestException(String message, Throwable cause) {
        super(message, cause)
    }
}
