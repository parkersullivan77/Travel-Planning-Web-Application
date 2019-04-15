package com.tripco.t19.misc;

import com.google.gson.JsonObject;
import com.tripco.t19.TIP.TIPItinerary;

import java.util.List;

public class Optimizer {

    private long[][] distances;
    private int[] tour;
    private boolean[] visited;
    private List<JsonObject> places;
    private double earthRadius;
    TIPItinerary itinerary = new TIPItinerary();

    public Optimizer(List<JsonObject> places, double earthRadius){
        this.places = places;
        this.earthRadius = earthRadius;
        distances = new long[places.size()][places.size()];
        tour = new int[places.size()];
        visited = new boolean[places.size()];
    }

    public void fillDistances(){
        for (int i = 0; i < distances.length; i++) {
            for (int j = i; j < distances.length; j++) {
                long dist = itinerary.getDistance(i, j);
                distances[i][j] = dist;
                distances[j][i] = dist;
            }
        }
    }

    public void nearestNeighbor() {
        fillDistances();
        for(int i = 0; i < tour.length; i++){
            tour[0] = i;
            visited[i] = true;

        }
//        for each starting city
//        add the starting city to the tour and remove from the list of unvisited cities
//        while there are unvisited cities remaining
//        from the last city in the tour add the nearest unvisited city to the tour
//        return the tour with the shortest round trip distance
    }
}
