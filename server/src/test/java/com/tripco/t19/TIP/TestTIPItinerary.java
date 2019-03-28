
package com.tripco.t19.TIP;

import com.google.gson.JsonObject;
import org.junit.Before;
import org.junit.Test;
import java.util.List;

public class TestTIPItinerary {


/* values shared by test cases */

    private final int version = 2;  //Version will be constant
    JsonObject testOptions = new JsonObject();
    testOptions.add("test", "gfsg");


    List<JsonObject> testPlaces;

    private final double testRadius = 3958;


    @Before
    public void createValuesForTestCases() {

    }

    @Test
    public void testOriginDestinationSame() {
        TIPItinerary trip = new TIPItinerary(version, testOptions, testPlaces,testRadius);
        trip.buildResponse();
        int expect = 50;
        long actual = trip.getDistance(0,50);
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
