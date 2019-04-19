package com.tripco.t19.misc;

import com.google.gson.JsonObject;
import com.tripco.t19.TIP.TIPItinerary;

import java.util.ArrayList;
import java.util.List;

public class Optimizer {

    private long[][] distances;
    public int[] shortestTour;
    private List<JsonObject> places;
    private double earthRadius;
    private long shortestDist;
    private long currShortest;
    TIPItinerary itinerary = new TIPItinerary();

    public Optimizer(List<JsonObject> places, double earthRadius){
        this.places = places;
        this.earthRadius = earthRadius;
        distances = new long[places.size()+1][places.size()+1];
        shortestTour = new int[places.size() + 1];
        currShortest = Long.MAX_VALUE;
    }

    public void fillDistances(){
        for (int i = 0; i < places.size(); i++) {
            for (int j = i; j < places.size(); j++) {
                double lat1 = places.get(i).get("latitude").getAsDouble();
                double lon1 = places.get(i).get("longitude").getAsDouble();
                double lat2 = places.get(j).get("latitude").getAsDouble();
                double lon2 = places.get(j).get("longitude").getAsDouble();
                long dist = GreatCircleDistance.haversine(lat1, lon1, lat2, lon2, earthRadius);
//                itinerary.getDistance(i, j);
                distances[i][j] = dist;
                distances[j][i] = dist;
            }
        }
    }

    private int nextCity(int index, boolean[] visited){
        shortestDist = Long.MAX_VALUE;
        long tempDist;
        int next = -1;
        for(int i = 0; i < places.size(); i++){
            if(visited[i]){
                continue;
            }
            tempDist = distances[index][i];
            if(tempDist < shortestDist){
                shortestDist = tempDist;
                next = i;
            }
        }
        return next;
    }

    public void nearestNeighbor(int start) {
        long cumulative = 0;
        int[] tour = new int[places.size()+1];
        boolean[] visited = new boolean[places.size() + 1];

        tour[0] = start;
        tour[places.size()] = start;
        visited[start] = true;
        visited[places.size()] = true;
        for(int i = 1; i < places.size(); i++){
            int next = nextCity(start, visited);
            start = next;
            tour[i] = next;
            visited[next] = true;
            cumulative += shortestDist;
        }
        cumulative += distances[tour[0]][tour[tour.length-2]];


        if(cumulative < currShortest){
            currShortest = cumulative;
            shortestTour = tour;
        }
//        for each starting city
//        add the starting city to the tour and remove from the list of unvisited cities
//        while there are unvisited cities remaining
//        from the last city in the tour add the nearest unvisited city to the tour
//        return the tour with the shortest round trip distance
    }

    public void rearrangePlaces(){
        List<JsonObject> tempPlaces = new ArrayList<>();
        for(int i = 0; i < places.size(); i++){
            tempPlaces.add(i, places.get(shortestTour[i]));
        }
        places = tempPlaces;
        System.out.println(places);
    }

    public void shortOpt(){
        fillDistances();
        for (int i = 0; i < places.size(); i++) {
            nearestNeighbor(i);
        }
        rearrangePlaces();
    }
}
