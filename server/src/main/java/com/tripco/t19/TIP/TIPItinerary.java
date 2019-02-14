package com.tripco.t19.TIP;

import com.google.gson.JsonObject;

public abstract class TIPItinerary extends TIPHeader{
      protected String requestType;
      protected JsonObject options;
      protected Object[] places;
      protected Integer[] distances;

      public String toString(){
            return "{requestVersion:" + requestVersion + ",requestType:" + requestType + "}";
      }

      TIPItinerary(int version, JsonObject options, Object[] places){
            this.requestVersion = version;
            this.options = options;
            this.places = places;
            this.distances = new Integer[places.length];
      }


      @Override
      public void buildResponse() {

      }
}
