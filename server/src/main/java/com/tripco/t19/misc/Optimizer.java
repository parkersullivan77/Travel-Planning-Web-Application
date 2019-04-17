package com.tripco.t19.misc;

import com.google.gson.JsonObject;
import com.tripco.t19.TIP.TIPItinerary;

import java.util.List;

public class Optimizer {

    private long[][] distances;
    private int[] tour;
    private int[] shortestTour;
    private boolean[] visited;
    private List<JsonObject> places;
    private double earthRadius;
    private long shortestDist;
    private long currShortest;
    TIPItinerary itinerary = new TIPItinerary();

    public Optimizer(List<JsonObject> places, double earthRadius){
        this.places = places;
        this.earthRadius = earthRadius;
        distances = new long[places.size()][places.size()];
        tour = new int[places.size() + 1];
        visited = new boolean[places.size() + 1];
        currShortest = Long.MAX_VALUE;
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

    private int nextCity(int index){
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

        tour[0] = start;
        tour[tour.length-1] = start;
        visited[start] = true;
        visited[visited.length-1] = true;
        for(int i = 1; i < places.size(); i++){
            int next = nextCity(start);
            start = next;
            tour[i] = next;
            visited[i] = true;
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
        List<JsonObject> tempPlaces = places;
        for(int i = 0; i < places.size(); i++){
            tempPlaces.set(i, places.get(tour[i]));
        }
        places = tempPlaces;
    }

    public void shortOpt(){
        fillDistances();
        for (int i = 0; i < places.size(); i++) {
            nearestNeighbor(i);
        }
        rearrangePlaces();
    }
}
