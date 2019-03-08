package com.tripco.t19.TIP;

import org.junit.Before;
import org.junit.Test;

import java.util.HashMap;
import java.util.Map;

import static org.junit.Assert.assertEquals;

/** Verifies the operation of the TIP distance class and its buildResponse method.
 */
public class TestTIPDistance {

  /* Radius and location values shared by test cases */
  private final Integer radiusMiles = 3958;

  private Map<String, Object> csu;
  private Map<String, Object> csu2;
  private Map<String, Object> LargeInput;
  private Map<String, Object> VeryLargeInput;

  private final int version = 2;

  @Before
  public void createLocationsForTestCases() {
    csu = new HashMap<>();
    csu.put("latitude", "40.576179");
    csu.put("longitude", "-105.080773");
    csu.put("name", "Oval, Colorado State University, Fort Collins, Colorado, USA");

    csu2 = new HashMap<>();
    csu2.put("latitude", "40.576498");  //Testing Distance from CSU to Rams village
    csu2.put("longitude", "-105.101929");
    csu2.put("name", "Rams Village, Fort Collins, Colorado, USA");

    LargeInput = new HashMap<>();   //for very large inputs
    LargeInput.put("latitude", "576498425245425245");
    LargeInput.put("longitude", "-429589482991354525");
    LargeInput.put("name", "A Large value");

    VeryLargeInput = new HashMap<>();   //for very large inputs
    VeryLargeInput.put("latitude", "32423042950249504295424234235859185941850134914");
    VeryLargeInput.put("longitude", "-542262652654254455242598425924859842585991354525");
    VeryLargeInput.put("name", "A very large value ");
  }
  @Test
   public void testOriginDestinationSame() {    //test with same origin and destination, should always return 0
    TIPDistance trip = new TIPDistance(version, csu, csu, radiusMiles);
    trip.buildResponse();
    int expect = 0;
    long actual = trip.getDistance();
    assertEquals("origin and destination are the same", expect, actual);
  }

  @Test
   public void testInput() {     //Distance between CSU and rams village
    TIPDistance trip = new TIPDistance(version, csu, csu2, radiusMiles);
    trip.buildResponse();
    int expect = 1;
    long actual = trip.getDistance();
    assertEquals("Distance between CSU and Rams village ", expect, actual);
  }
/*@Test
   public void testVeryLargeInputs(){ //Distance between two very large inputs
    TIPDistance trip = new TIPDistance(version, LargeInput, VeryLargeInput, radiusMiles);
    trip.buildResponse();
    int expect = 5544;
    long actual = trip.getDistance();
    assertEquals("Distance between two very Large distances ", expect, actual);
  }
*/
}

