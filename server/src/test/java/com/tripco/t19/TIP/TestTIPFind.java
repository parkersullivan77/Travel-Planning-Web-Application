package com.tripco.t19.TIP;
import org.junit.Before;
import org.junit.Test;
import java.util.HashMap;
import java.util.Map;
import java.util.ArrayList;
import static org.junit.Assert.assertEquals;

//Test TipFind
public class TestTIPFind {
    ArrayList<Map> myPlaces = new ArrayList();


    @Before
    public void createValuesForTestCases() {
       /* Map<String,String> RandomMap = new <String,String>HashMap();
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
        Randomtest.put("municipality","Not Larimer");*/

      /*  myPlaces.add(RandomMap);*/
        //myPlaces.add(Randomtest);
    }

/*

*/

/*    @Test
    public void testExistingString() {
        TIPFind find = new TIPFind("Fort Collins Downtown Airport", 22, myPlaces, 0);
        find.buildResponse();        //String expect = "random ";
        String actual = find.toString();
        String expect = "{match: Fort Collins Downtown Airport, limit: 22, found: 1, places:[{altitude=4939, latitude=40.5882987976, name=Fort Collins Downtown Airport, municipality=null, id=K3V5, longitude=-105.041999817}]";
        assertEquals("Some test", expect, actual);
    }*/
    @Test
    public void testStringNotInPlaces() {  //Test for string not in places
        TIPFind find = new TIPFind("subscribe 2 pewdiepie", 22, myPlaces, 0);
        find.buildResponse();
        String actual = find.toString();
        String expect = "{match: subscribe 2 pewdiepie, limit: 22, found: 0, places:[]";
        assertEquals("Some test", expect, actual);
    }
    @Test
    public void testAnotherStringNotInPlaces() {  //Test for string not in places
        TIPFind find = new TIPFind("nonexistent string", 22, myPlaces, 0);
        find.buildResponse();
        String actual = find.toString();
        String expect = "{match: nonexistent string, limit: 22, found: 0, places:[]";
        assertEquals("Some test", expect, actual);
    }
    @Test
    public void randomTest() {
        TIPFind empty = new TIPFind();
        empty.buildResponse();
    }
}
