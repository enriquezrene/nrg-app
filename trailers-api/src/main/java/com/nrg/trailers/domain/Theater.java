package com.nrg.trailers.domain;

import com.nrg.trailers.firebase.domain.FirebaseCollection;

/**
 * Created by rene on 19/10/16.
 */
public class Theater {

    public static class Collection extends FirebaseCollection<Theater> {
    }

    private String name;
    private String address;
    private String websiteUrl;
    private String city;

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getAddress() {
        return address;
    }

    public void setAddress(String address) {
        this.address = address;
    }

    public String getWebsiteUrl() {
        return websiteUrl;
    }

    public void setWebsiteUrl(String websiteUrl) {
        this.websiteUrl = websiteUrl;
    }

    public String getCity() {
        return city;
    }

    public void setCity(String city) {
        this.city = city;
    }
}
