package com.tripco.t19.TIP;

import com.google.gson.JsonArray;
import com.google.gson.JsonElement;
import com.google.gson.JsonObject;
import com.tripco.t19.misc.GreatCircleDistance;
import com.tripco.t19.misc.TIPOptimizer;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import java.util.List;

public class TIPItinerary extends TIPHeader{
      protected JsonObject options;
      protected List<JsonObject> places;
      protected Long[] distances;
      protected Double earthRadius;


      private final transient Logger log = LoggerFactory.getLogger(TIPItinerary.class);

      public String toString(){
            return "{requestVersion:" + requestVersion + ",requestType:" + requestType + "}";
      }

      TIPItinerary(Integer version, JsonObject options, List<JsonObject> places) {
            this();
            this.requestVersion = version;
            this.options = options;
            this.places = places;
      }
      TIPItinerary(Integer version, JsonObject options, List<JsonObject> places,double earthRadius){
            this();
            this.requestVersion = version;
            this.options = options;
            this.places = places;
            this.earthRadius = earthRadius;
      }

      private TIPItinerary() {
            this.requestType = "itinerary";
      }

      @Override
      public void buildResponse(){
          calculateDistances();
          optimize();
          log.trace("buildResponse -> {}", this);
      }


      public void calculateDistances(){
          this.distances = new Long[places.size()];
          for (int i = 0; i < this.distances.length - 1; i++) {
              this.distances[i] = getDistance(i, i + 1);
          }
          this.distances[distances.length-1] = getDistance(distances.length-1, 0);
      }

      Long getDistance(int origin, int dest){
            double lat1 = places.get(origin).get("latitude").getAsDouble();
            double lon1 = places.get(origin).get("longitude").getAsDouble();
            double lat2 = places.get(dest).get("latitude").getAsDouble();
            double lon2 = places.get(dest).get("longitude").getAsDouble();
            if(this.earthRadius == null) {
                  this.earthRadius = Double.parseDouble(this.options.get("earthRadius").toString().replaceAll("\"", ""));
            }
            return GreatCircleDistance.haversine(lat1, lon1, lat2, lon2, earthRadius);
      }
     public void optimize() {
           JsonElement opt = options.get("optimization");
           JsonElement radius = options.get("earthRadius");
           double rad = radius.getAsDouble();
           log.trace(opt.toString());
           if (opt.toString().compareTo("\"short\"") == 0){
                 TIPOptimizer opts = new TIPOptimizer(places, rad);
                 opts.shortOpt();
                 places = opts.places;
                 log.trace("in optimize");
                 log.trace(places.toString());
           }
     }
}