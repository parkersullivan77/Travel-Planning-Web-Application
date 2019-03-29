
package com.tripco.t19.TIP;

import com.tripco.t19.misc.GreatCircleDistance;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import java.util.Map;


/** Defines the TIP distance object.
 *
 * For use with restful API services,
 * An object is created from the request JSON by the MicroServer using GSON.
 * The buildResponse method is called to determine the distance.
 * The MicroServer constructs the response JSON from the object using GSON.
 *
 * For unit testing purposes,
 * An object is created using the constructor below with appropriate parameters.
 * The buildResponse method is called to determine the distance.
 * The getDistance method is called to obtain the distance value for comparisons.
 *
 */
public class TIPDistance extends TIPHeader{
  private Map origin;
  private Map destination;
  private Double earthRadius;
  private Long distance;

  private final transient Logger log = LoggerFactory.getLogger(TIPDistance.class);

  public String toString(){
    return "{origin:" + origin + ",destination:" + destination + ",earthRadius:" + earthRadius + ",distance:" + distance + "}";
  }
  TIPDistance(int version, Map origin, Map destination, double earthRadius){
    this();
    this.requestVersion = version;
    this.origin = origin;
    this.destination = destination;
    this.earthRadius = earthRadius;
    this.distance = 0L;
  }

  private TIPDistance() {
    this.requestType = "distance";
  }


  @Override
  public void buildResponse() {
    this.distance = 0L;
    this.distance = getDistance();
    log.trace("buildResponse -> {}", this);
  }


  Long getDistance() {
    double lat1  = Double.parseDouble((String)origin.get("latitude"));
    double lon1  = Double.parseDouble((String)origin.get("longitude"));
    double lat2  = Double.parseDouble((String)destination.get("latitude"));
    double lon2  = Double.parseDouble((String)destination.get("longitude"));
    distance = (GreatCircleDistance.haversine(lat1, lon1, lat2, lon2, earthRadius));
    return distance;
  }
}