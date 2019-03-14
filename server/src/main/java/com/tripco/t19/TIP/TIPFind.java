package com.tripco.t19.TIP;

import com.google.gson.JsonObject;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.List;

public class TIPFind extends TIPHeader{

    protected String match;
    protected int limit;
    protected int found;
    protected List<JsonObject> places;

    // db configuration information
    private final static String myDriver = "com.mysql.jdbc.Driver";
    private final static String myUrl = "jdbc:mysql://faure.cs.colostate.edu/cs314";
    private final static String user="cs314-db";
    private final static String pass="eiK5liet1uej";

    // fill in SQL queries to count the number of records and to retrieve the data
    private final static String count = "";
    private final static String search = "";


    private final transient Logger log = LoggerFactory.getLogger(TIPConfig.class);

    @Override
    public void buildResponse() {
        fillPlaces();
        log.trace("buildResponse -> {}", this);
    }

    @Override
    public String toString(){
        return "{match: " + match + ", limit: " + limit + ", found: " + found + ", places:" + places;
    }

    TIPFind(String match, int limit){
        this.match = match;
        this.limit = limit;
    }

    public void fillPlaces(){
        //query SOMETHING to fill places with limit items
    }

    private static void printJSON(ResultSet count, ResultSet query) throws SQLException {
        System.out.printf("\n{\n");
        System.out.printf("\"type\": \"find\",\n");
        System.out.printf("\"title\": \"%s\",\n",search);
        System.out.printf("\"places\": [\n");

        // determine the number of results that match the query
        count.next();
        int results = count.getInt(1);

        // iterate through query results and print out the airport codes
        while (query.next()) {
            System.out.printf("  \"%s\"", query.getString("code"));
            if (--results == 0)
                System.out.printf("\n");
            else
                System.out.printf(",\n");
        }
        System.out.printf("  ]\n}\n");
    }
}
