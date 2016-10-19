package com.nrg.trailers.conf

import groovy.transform.CompileStatic
import org.slf4j.Logger
import org.slf4j.LoggerFactory
import org.springframework.stereotype.Component
import org.springframework.web.filter.OncePerRequestFilter

import javax.servlet.*
import javax.servlet.http.HttpServletRequest
import javax.servlet.http.HttpServletResponse

/**
 * Created by rene on 19/10/16.
 */
@CompileStatic
@Component
public class CorsFilter extends OncePerRequestFilter {

    static Logger logger = LoggerFactory.getLogger(CorsFilter)

    /**
     * {@inheritDoc}
     */
    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain chain) {
        logger.trace('Adding access control headers')

        String origin = request.getHeader('Origin')
        logger.trace(" Origin: ${origin}")

        response.setHeader('Access-Control-Allow-Origin', origin ?: '*');
        response.setHeader('Access-Control-Allow-Credentials', 'true');

        if ('OPTIONS' == request.method) {
            response.setHeader('Access-Control-Allow-Headers', 'origin, authorization, accept, content-type, x-requested-with');
            response.setHeader('Access-Control-Allow-Methods', 'GET, HEAD, POST, PUT, DELETE, TRACE, OPTIONS');
            response.setHeader('Access-Control-Max-Age', '3600');
        } else if (!response.isCommitted()) {
            chain.doFilter(request, response);
        }
    }

//    public void doFilter(ServletRequest req, ServletResponse res,
//                         FilterChain chain) throws IOException, ServletException {
//        HttpServletResponse response = (HttpServletResponse) res;
//        response.setHeader("Access-Control-Allow-Origin", "*");
//        response.setHeader("Access-Control-Allow-Methods",
//                "POST, GET, PUT, OPTIONS, DELETE");
//        response.setHeader("Access-Control-Max-Age", "3600");
//        response.setHeader("Access-Control-Allow-Headers",
//                "Origin, X-Requested-With, Content-Type, Accept");
//        chain.doFilter(req, res);
//    }

//    public void init(FilterConfig filterConfig) {
//
//    }
//
//    public void destroy() {
//
//    }
}
