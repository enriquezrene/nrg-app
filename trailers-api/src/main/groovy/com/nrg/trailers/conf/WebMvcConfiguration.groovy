package com.nrg.trailers.conf

import org.springframework.context.annotation.Configuration
import org.springframework.http.converter.HttpMessageConverter
import org.springframework.http.converter.StringHttpMessageConverter
import org.springframework.web.servlet.config.annotation.WebMvcConfigurationSupport

/**
 * Created by rene on 19/10/16.
 */
@Configuration
class WebMvcConfiguration extends WebMvcConfigurationSupport{

    @Override
    protected void extendMessageConverters(List<HttpMessageConverter<?>> converters) {
        HttpMessageConverter converter = converters.find {
            it instanceof StringHttpMessageConverter
        }
        converters.remove(converter)
    }
}
