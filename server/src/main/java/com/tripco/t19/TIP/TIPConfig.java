package com.tripco.t19.TIP;

import com.google.gson.JsonArray;
import com.google.gson.JsonObject;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import java.util.Arrays;
import java.util.List;

/** This class defines the Config response that provides the client
 * with server specific configuration information.
 *  
 * When used with restful API services,
 * An object is created from the request JSON by the MicroServer using GSON.
 * The buildResponse method is called to set the configuration information.
 * The MicroServer constructs the response JSON from the object using GSON.
 *  
 * When used for testing purposes,
 * An object is created using the constructor below.
 * The buildResponse method is called to set the configuration information.
 * The getDistance method is called to obtain the distance value for comparisons.
 */
public class TIPConfig extends TIPHeader {
  private String serverName;
  private List<String> placeAttributes;
  private List<String> optimizations;
  private JsonObject filters = new JsonObject();

  private final transient Logger log = LoggerFactory.getLogger(TIPConfig.class);

  public TIPConfig() {
    this.requestType = "config";
    this.requestVersion = 5;
  }

  @Override
  public void buildResponse() {
    this.serverName = "T19 We Them Boys";
    this.placeAttributes = Arrays.asList("name", "latitude", "longitude", "id", "municipality", "region", "country", "continent", "altitude");
    this.optimizations = Arrays.asList("none", "short");
    JsonArray tempValuesArray = new JsonArray();
    tempValuesArray.add("airport");
    tempValuesArray.add("heliport");
    tempValuesArray.add("balloonport");
    tempValuesArray.add("closed");
    filters.addProperty("name", "type");
    filters.add("values", tempValuesArray);
    log.trace("buildResponse -> {}", this);
  }
  @Override
  public String toString()
  {
    return "ServerName : " + serverName + " " + "Place Attributes : " + placeAttributes
            + " Filters : " + filters;
  }

  int getVersion() {
    return this.requestVersion;
  }

  String getServerName() {
    return this.serverName;
  }

  List<String> getPlaceAttributes() {
    return this.placeAttributes;
  }

  List<String> getOptimizationAttributes() {
    return this.optimizations;
  }

  JsonObject getFilters() {
    return this.filters;
  }

}
