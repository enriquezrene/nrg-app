package com.ioet.trailers.firebase

import groovy.transform.CompileStatic
import org.slf4j.Logger
import org.slf4j.LoggerFactory
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.core.env.Environment
import org.springframework.stereotype.Component

/**
 * Loads and manages the configuration for how to speak to Firebase.  The information can come from either
 * system environment properties, Java runtime properties or from disk at <code>.firebase/config.json</code>.
 *
 * @author Clark Malmgren
 */

@Component
@CompileStatic
class FirebaseConfig {

    static final Logger logger = LoggerFactory.getLogger(FirebaseConfig)

    @Autowired
    Environment environment

    String getBaseUrl() {
        String url = environment.getProperty("firebase.url", String)
        logger.info('Connecting to Firebase via ' + url)
        return url
    }

    String getSecret() {
        return environment.getProperty("firebase.secret", String)
    }

    long getAuthTTL() {
        long ttl = environment.getProperty("firebase.auth.ttl", Long)
        logger.info('Firebase Security TTL: ' + ttl + ' seconds')
        return ttl
    }

}
