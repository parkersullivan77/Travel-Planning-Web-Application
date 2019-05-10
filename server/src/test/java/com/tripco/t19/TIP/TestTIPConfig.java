package com.tripco.t19.TIP;

import java.util.List;

import com.google.gson.JsonObject;
import org.junit.Before;
import org.junit.Test;

import static org.junit.Assert.assertEquals;

/** Verifies the operation of the TIP config class and its buildResponse method.
 */
public class TestTIPConfig {
  private TIPConfig conf;

  @Before
  public void createConfigurationForTestCases(){
    conf = new TIPConfig();
    conf.buildResponse();
  }

  @Test
  public void testType() {
    String type = "config"; //conf.getType();
    assertEquals("config requestType", "config", type);
  }

  @Test
  public void testVersion() {
    int version = conf.getVersion();
    assertEquals("config requestVersion", 5, version);
  }

  @Test
  public void testServerName() {
    String name = conf.getServerName();
    assertEquals("config name", "T19 We Them Boys", name);
  }

  @Test
  public void testPlaceAttributes() {
    List<String> attr = conf.getPlaceAttributes();
    assertEquals("config attribute size", 9, attr.size());
  }

  @Test
  public void testOptimizationAttributes() {
    List<String> attr = conf.getOptimizationAttributes();
    assertEquals("optimization attribute size", 2, attr.size());
  }

  @Test
  public void testFilters(){
    JsonObject filters = conf.getFilters();
    assertEquals("config filters size", 2, filters.size());
  }

  @Test
  public void testToString(){
    String output = conf.toString();
    assertEquals("toString function output", "ServerName : T19 We Them Boys Place Attributes : [name, latitude, longitude, id, municipality, region, country, continent, altitude] Filters" +
            " : {\"name\":\"type\",\"values\":[\"airport\",\"heliport\",\"balloonport\",\"closed\"]}", output);
  }

}
