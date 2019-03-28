package com.tripco.t19.TIP;
import org.junit.Before;
import org.junit.Test;
import java.util.HashMap;
import java.util.Map;
import java.util.ArrayList;
import static org.junit.Assert.assertEquals;

//Test TipFind
public class TestTIPFind {
    ArrayList<Map> myPlaces;

    @Before
    public void createValuesForTestCases() {
        myPlaces.add(0,"Fort Collins");
    }
    @Test
    public void testExistingString() {    //test with same origin and destination, should always return 0
        TIPFind find = new TIPFind("match",0,myPlaces,0);
        find.buildResponse();
        find.buildQuery();
    /*
        int expect = 0;
        String expected = "";
        String actual = find.toString();

        assertEquals("Match??", expect, actual);*/
    }
    @Test
    public void testNonExistingString() {
        TIPFind find = new TIPFind("hello",0,myPlaces,0)
        find.buildResponse();
        find.buildQuery();
    }
}