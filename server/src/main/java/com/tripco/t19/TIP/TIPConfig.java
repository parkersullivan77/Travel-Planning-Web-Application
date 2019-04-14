package com.tripco.t19.TIP;

import com.google.gson.JsonArray;
import com.google.gson.JsonElement;
import com.google.gson.JsonObject;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import java.util.*;

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
  //private List<List<String>> filters;
  private JsonObject filtersJ = new JsonObject();
  private Map filters;

  private final transient Logger log = LoggerFactory.getLogger(TIPConfig.class);

  public TIPConfig() {
    this.requestType = "config";
    this.requestVersion = 4;
  }


  @Override
  public void buildResponse() {
    this.serverName = "T19 We Them Boys";
    this.placeAttributes = Arrays.asList("name", "latitude", "longitude", "id", "municipality", "region", "country", "continent", "altitude");
    this.optimizations = Arrays.asList("none");
    Map<String, List> temp = new HashMap<>();
    List<String> tempListOfTypes = Arrays.asList("type");
    JsonArray je = new JsonArray();
    je.add("airport");
    je.add("heliport");
    je.add("balloonport");
    je.add("closed");
    List<String> tempListOfValues = Arrays.asList("airport", "heliport", "balloonport", "closed");
    //filtersJ.add();
    filtersJ.addProperty("name", "type");
    filtersJ.add("values", je);
    temp.put("values", tempListOfValues);
    this.filters = temp;
    //temp.put("values", Arrays.asList("airport"));
    //this.filters = Arrays.asList(Arrays.asList("values", "airport", "heliport", "balloonport", "closed"));
    log.trace("buildResponse -> {}", this);
  }
  @Override
  public String toString()
  {
    return "ServerName : " + serverName + " " + "Place Attributes : " + placeAttributes + " " + "Filters : " + filters + " FiltersJ : " + filtersJ;
   // return "{\"serverName\":"+ "\"" + serverName + "\"," + placeAttributes;

    //no need to return log
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
  List<String> getOptimizationAttributes() { return this.optimizations; }
  //List<List<String>> getFilters() {return this.filters;}


}
