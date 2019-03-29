

package com.tripco.t19.TIP;

import com.google.gson.JsonObject;
import org.junit.Before;
import org.junit.Test;

import java.util.ArrayList;
import java.util.List;

import static org.junit.Assert.assertEquals;

public class TestTIPItinerary {

    private final int version = 2;  //Version will be constant
    JsonObject testOptions;
    List<JsonObject> testPlaces;
    private final double testRadius = 3958;


    @Before
    public void createValuesForTestCases() {

        testPlaces = new ArrayList<>();
        testOptions =  new JsonObject();

        testOptions.addProperty("title","My Trip");
        testOptions.addProperty("earthRadius","3958.8");
        testOptions.addProperty("optimization","none");

        JsonObject myPlace = new JsonObject();
        myPlace.addProperty("name","Denver");
        myPlace.addProperty("latitude", "39.7");
        myPlace.addProperty("longitude","-105.0");

        JsonObject myPlace2 = new JsonObject();
        myPlace2.addProperty("optimization","none");
        myPlace2.addProperty("name","Fort Collins");
        myPlace2.addProperty("earthRadius","4231.8");

        testPlaces.add(myPlace);
        testPlaces.add(myPlace);

    }

    @Test
    public void testOriginDestinationSame() {
        TIPItinerary trip = new TIPItinerary(version, testOptions, testPlaces,testRadius);
        trip.buildResponse();
        Long expect = 0L;
        Long actual = trip.getDistance(0,0);
        assertEquals("Difference ", expect, actual);
    }
    @Test
    public void testing (){
        TIPItinerary trip = new TIPItinerary(version, testOptions, testPlaces,testRadius);
        trip.buildResponse();
        Long expect = 0L;
        Long actual = trip.getDistance(1,1);
        assertEquals("Difference ", expect, actual);
    }
/*
    @Test
    public void anotherTest() {
        TIPItinerary trip = new TIPItinerary(version, testOptions, testPlaces,testRadius);
        trip.buildResponse();
        long expect = 6050;
        long actual = trip.getDistance(0,50);
    }

    @Test
    public void anothaOne() {
        TIPItinerary trip = new TIPItinerary(version, testOptions, testPlaces,testRadius);
        trip.buildResponse();
        int expect = 50;
        long actual = trip.getDistance(0,50);
    }*/



}