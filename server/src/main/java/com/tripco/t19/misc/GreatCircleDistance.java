package com.tripco.t19.misc;

import java.lang.Math;

/** Determines the distance between geographic coordinates.
 */
public class GreatCircleDistance {
    //This code was provided by Rosetta Code
    //https://rosettacode.org/wiki/Haversine_formula#Java
    //public static final double R = 6372.8; // In kilometers

    public static Long haversine(double lat1, double lon1, double lat2, double lon2, double radius) {
        double dLat = Math.toRadians(lat2 - lat1);
        double dLon = Math.toRadians(lon2 - lon1);
        lat1 = Math.toRadians(lat1);
        lat2 = Math.toRadians(lat2);

        double a = Math.pow(Math.sin(dLat / 2),2) + Math.pow(Math.sin(dLon / 2),2) * Math.cos(lat1) * Math.cos(lat2);
        double c = 2 * Math.asin(Math.sqrt(a));
        return Math.round(radius * c);
    }
}