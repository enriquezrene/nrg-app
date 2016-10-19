package com.nrg.trailers.domain;

import com.nrg.trailers.firebase.domain.FirebaseCollection;

/**
 * Created by rene on 19/10/16.
 */
public class Market {

    private String name;
    private String country;

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getCountry() {
        return country;
    }

    public void setCountry(String country) {
        this.country = country;
    }

    public static class Collection extends FirebaseCollection<Market> {
    }


}
