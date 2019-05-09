package com.tripco.t19.misc;

import com.google.gson.JsonObject;
import org.junit.Before;
import org.junit.Test;
import static org.junit.Assert.assertArrayEquals;

import java.util.ArrayList;
import java.util.List;

public class TestNearestNeighbor {
    List<JsonObject> testList;
    private final double testRadius = 3958.761316;

    @Before
    public void initializeTestObject() {
        testList = new ArrayList<>();

        JsonObject myPlace0 = new JsonObject();
        myPlace0.addProperty("name", "Denver");
        myPlace0.addProperty("latitude", "39.7392");
        myPlace0.addProperty("longitude", "-104.9903");

        JsonObject myPlace1 = new JsonObject();
        myPlace1.addProperty("name", "Boulder");
        myPlace1.addProperty("latitude", "40.01499");
        myPlace1.addProperty("longitude", "-105.27055");

        JsonObject myPlace2 = new JsonObject();
        myPlace2.addProperty("name", "Colorado Springs");
        myPlace2.addProperty("latitude", "38.8339");
        myPlace2.addProperty("longitude", "-104.8214");

        JsonObject myPlace3 = new JsonObject();
        myPlace3.addProperty("name", "Fort Collins");
        myPlace3.addProperty("latitude", "40.585258");
        myPlace3.addProperty("longitude", "-105.084419");

        JsonObject myPlace4 = new JsonObject();
        myPlace4.addProperty("name", "Pueblo");
        myPlace4.addProperty("latitude", "38.2544");
        myPlace4.addProperty("longitude", "-104.6091");

        testList.add(myPlace0);
        testList.add(myPlace1);
        testList.add(myPlace2);
        testList.add(myPlace3);
        testList.add(myPlace4);
    }

    @Test
    public void testShorter(){
        TIPOptimizer testOpt = new TIPOptimizer(testList, testRadius);
        testOpt.shortOpt();
        int[] expect = {3, 1, 0, 2, 4, 3};
        assertArrayEquals(expect, testOpt.shortestTour);
    }

}