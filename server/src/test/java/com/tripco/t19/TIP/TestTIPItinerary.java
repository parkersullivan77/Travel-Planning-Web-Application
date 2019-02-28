package com.tripco.t19.TIP;

import org.junit.Before;
import org.junit.Test;

import com.google.gson.JsonObject;
import com.google.gson.JsonArray;
import com.google.gson.JsonObject;
import com.tripco.t19.misc.GreatCircleDistance;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import static org.junit.Assert.assertEquals;

/** Verifies the operation of the TIP distance class and its buildResponse method.
 */
public class TestTIPItinerary {

    /* Radius and location values shared by test cases */
    private final Integer radiusMiles = 3958;



    private final int version = 1;
    List<JsonObject> testPlaces;
    JsonObject testOptions =   new JsonObject();
    @Before
    public void createLocationsForTestCases() {
        //someTest = new HashMap<>();
        testOptions.add("Title", "My Trip");
        testOptions.add("earthRadius:  "," 3958.761316 ").toString();
        /*testPlaces.put({"id":"dnvr", "name":"Denver",       "latitude": "39.7392",   "longitude": "-104.9903"},
        {"id":"bldr", "name":"Boulder",      "latitude": "40.01499",  "longitude": "-105.27055"},
        {"id":"foco", "name":"Fort Collins", "latitude": "40.585258", "longitude": "-105.084419"});*/


 /*     TIPItinerary(Integer version, JsonObject options, List<JsonObject> places) {
            this();
            this.requestVersion = version;
            this.options = options;
            this.places = places;
      }*/

    }

}
