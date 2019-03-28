/*

package com.tripco.t19.TIP;

import com.google.gson.JsonObject;
import org.junit.Before;
import org.junit.Test;
import java.util.List;

public class TestTIPItinerary {

    private final int version = 2;  //Version will be constant
    JsonObject testOptions;
    List<JsonObject> testPlaces;
    private final double testRadius = 3958;


    @Before
    public void createValuesForTestCases() {

        testOptions =  new JsonObject();

        testOptions.addProperty("title","My Trip");
        testOptions.addProperty("earthRadius","3958.8");
        testOptions.addProperty("optimization","none");

        JsonObject myPlace = new JsonObject();
        myPlace.addProperty("name","Denver");
        myPlace.addProperty("latitude", "39.7");
        myPlace.addProperty("longitude","-105.0");

        //testPlaces.add(myPlace);
    }

    @Test
    public void testOriginDestinationSame() {
        TIPItinerary trip = new TIPItinerary(version, testOptions, testPlaces,testRadius);
       // trip.buildResponse();
       // int expect;
       // long actual = trip.getDistance(0,50);
    }

    @Test
    public void anotherTest() {
        TIPItinerary trip = new TIPItinerary(version, testOptions, testPlaces,testRadius);
        trip.buildResponse();
        int expect = 50;
        long actual = trip.getDistance(0,50);
    }

    @Test
    public void anothaOne() {
        TIPItinerary trip = new TIPItinerary(version, testOptions, testPlaces,testRadius);
        trip.buildResponse();
        int expect = 50;
        long actual = trip.getDistance(0,50);
    }



}
*/
