package com.ioet.trailers.firebase

import com.firebase.client.AuthData
import com.firebase.client.Firebase
import com.firebase.client.FirebaseError
import com.firebase.security.token.TokenGenerator
import com.firebase.security.token.TokenOptions
import groovy.transform.CompileStatic
import org.slf4j.Logger
import org.slf4j.LoggerFactory
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.stereotype.Component

import java.util.concurrent.TimeUnit

/**
 * Wraps the Firebase object so as to ensure that it is always authenticated with the server.
 *
 * @author Clark Malmgren
 */
@Component
@CompileStatic
class FirebaseRoot implements Firebase.AuthResultHandler, Firebase.AuthStateListener {

    static final Logger logger = LoggerFactory.getLogger(FirebaseRoot)

    @Autowired
    FirebaseConfig firebaseConfig

    private long uid = 0
    FirebaseFactory factory = new FirebaseFactory()
    Firebase root = null
    Date expires
    FirebaseError error = null
    boolean authenticated = false
    boolean authenticating = false

    /**
     * Generate a relative Date from right now.
     *
     * @param count the relative count (duration)
     * @param units the units
     *
     * @return the relative date
     */
    Date relative(long count, TimeUnit units) {
        long ts = System.currentTimeMillis() + units.toMillis(count)
        return new Date(ts)
    }

    /**
     * Get the root firebase object authenticating as necessary.
     *
     * @param timeout the amount of time to wait before failing
     * @return the root firebase object
     */
    synchronized Firebase get(long timeout = 5000) {
        Date aMinuteFromNow = relative(-1, TimeUnit.MINUTES)

        /* These are used for debugging purposes */
        boolean waitedOnOtherThread = false
        boolean didAuthentication = false
        long tsStart = System.currentTimeMillis()

        /* Ensure that only one thread does the authenticating at a time */
        while (this.authenticating) {
            waitedOnOtherThread = true

            /* No infinite waiting allowed */
            this.wait(Math.max(1, timeout))
        }

        /* See if we need to authenticate with Firebase */
        if (!root || !expires || !authenticated || expires.before(aMinuteFromNow)) {
            try {
                this.reset()
                didAuthentication = true
                this.authenticating = true

                Map payload = new HashMap()
                payload.uid = Long.toHexString(uid++)
                payload.provider = 'grubhub-tempura'

                expires = relative(firebaseConfig.authTTL, TimeUnit.SECONDS)

                TokenOptions options = new TokenOptions()
                options.setExpires(expires)

                TokenGenerator tokenGenerator = new TokenGenerator(firebaseConfig.secret)
                String token = tokenGenerator.createToken(payload, options)

                root = factory.generate(firebaseConfig.baseUrl)
                root.authWithCustomToken(token, this)

                /* No infinite waiting allowed */
                this.wait(Math.max(1, timeout))

                if (error != null) {
                    throw new IOException("Firebase authentication failed: ${error.message}")
                } else if (!authenticated) {
                    throw new IOException("Firebase authentication timed out")
                }
            } finally {
                authenticating = false
                this.notifyAll()
            }
        }

        /* Metrics on Authentication Times */
        if (waitedOnOtherThread) {
            long time = System.currentTimeMillis() - tsStart;
            logger.info("Waited ${time}ms for another thread to authenticate with Firebase");
        } else if (didAuthentication) {
            long time = System.currentTimeMillis() - tsStart;
            logger.info("Took ${time}ms to authenticate with Firebase");
        }

        return root
    }

    /**
     * Reset the firebase service basically causing the very next call to have to re-authenticate to succeed.
     */
    synchronized void reset() {
        if (this.root) {
            this.root.removeAuthStateListener(this)
            this.root.unauth()
        }

        this.root = null
        this.expires = null
        this.authenticated = false
    }

    @Override
    synchronized void onAuthenticated(AuthData authData) {
        logger.info("Firebase connection is now authenticated!")

        this.error = null
        this.authenticated = true

        this.notifyAll()
    }

    @Override
    synchronized void onAuthenticationError(FirebaseError firebaseError) {
        logger.error("Firebase authentication failed!")
        logger.error("  message: ${firebaseError.message}")
        logger.error("  details: ${firebaseError.details}")

        this.error = firebaseError
        this.root = null
        this.authenticated = false

        this.notifyAll()
    }

    @Override
    synchronized void onAuthStateChanged(AuthData authData) {
        if (authData == null) {
            logger.info("Firebase connection is now un-authenticated!")

            this.error = null
            this.root = null
            this.authenticated = false
        }
    }

    static class FirebaseFactory {

        Firebase generate(String url) {
            return new Firebase(url)
        }
    }
}
