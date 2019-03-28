/*
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
        Map<String,String> RandomMap = new <String,String>HashMap();
        Map<String,String> Randomtest = new HashMap();
        RandomMap.put("id","testID");
        RandomMap.put("name","Fort Collins");
        RandomMap.put("latitude","40.6");
        RandomMap.put("longitude","-105.1");
        RandomMap.put("altitude","5024");
        RandomMap.put("municipality","Larimer");

        Randomtest.put("id","testID");
        Randomtest.put("name","Denver");
        Randomtest.put("latitude","92.6");
        Randomtest.put("longitude","-32.1");
        Randomtest.put("altitude","4096");
        Randomtest.put("municipality","Not Larimer");

        myPlaces.add(RandomMap);
        //myPlaces.add(Randomtest);
    }
    @Test
    public void testExistingString() {    //test with same origin and destination, should always return 0
        TIPFind find = new TIPFind("Fort",0,myPlaces,4);
        find.buildQuery();
        find.buildResponse();
    }
    @Test
    public void testNonExistingString() {
        TIPFind find = new TIPFind("notpartoffile",0,myPlaces,0);
        find.buildQuery();
        find.buildResponse();
    }
}*/
