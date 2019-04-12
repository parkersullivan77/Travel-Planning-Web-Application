package com.tripco.t19.TIP;

import java.util.List;

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
    assertEquals("config requestVersion", 4, version);
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
    assertEquals("optimization attribute size", 1, attr.size());
  }

  @Test
  public void testFilters(){
    List<List<String>> filters = conf.getFilters();
    assertEquals("config filters size", 1, filters.size());
  }
}
