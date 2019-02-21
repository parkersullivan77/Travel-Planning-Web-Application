package com.tripco.t19.TIP;

import com.google.gson.JsonArray;
import com.google.gson.JsonObject;
import com.tripco.t19.misc.GreatCircleDistance;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import java.util.List;

public abstract class TIPItinerary extends TIPHeader{
      protected JsonObject options;
      protected List<JsonObject> places;
      protected Double[] distances;
      protected Long earthRadius;

      private final transient Logger log = LoggerFactory.getLogger(TIPItinerary.class);


      public String toString(){
            return "{requestVersion:" + requestVersion + ",requestType:" + requestType + "}";
      }

      TIPItinerary(Integer version, JsonObject options, List<JsonObject> places){
            this.requestVersion = version;
            this.options = options;
            this.places = places;
            this.distances = new Double[places.size()];
            this.earthRadius =  options.get("earthRadius").getAsLong();
      }


      @Override
      public void buildResponse() {
            for(int i = 0; i < (distances.length-1); i++ ){
                  this.distances[i] = getDistance(i, i+1);
            }
            this.distances[distances.length-1] = getDistance(distances.length-1, 0);
            log.trace("buildResponse -> {}", this);
      }

      double getDistance(int origin, int dest){
            double lat1 = places.get(origin).get("latitude").getAsDouble();
            double lon1 = places.get(origin).get("longitude").getAsDouble();
            double lat2 = places.get(dest).get("latitude").getAsDouble();
            double lon2 = places.get(dest).get("longitude").getAsDouble();
            return GreatCircleDistance.haversine(lat1, lon1, lat2, lon2, earthRadius);
      }
}