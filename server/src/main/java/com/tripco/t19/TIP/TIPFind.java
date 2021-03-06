package com.tripco.t19.TIP;
import com.google.gson.JsonArray;
import com.google.gson.JsonObject;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import java.sql.ResultSet;
import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.Statement;
import java.sql.SQLException;
import java.util.*;

public class TIPFind extends TIPHeader{

    protected String match;
    protected int limit;
    protected int found;
    protected ArrayList<Map> places;
    protected List<HashMap<String, Object>> narrow;
    protected List<List<String>> filterValues;
    protected List<String> namesOfValues;



    // db configuration information
    private final static String myDriver = "com.mysql.jdbc.Driver";
    private transient String myUrl = "";
    private transient String user="cs314-db";
    private transient String pass="eiK5liet1uej";

    // fill in SQL queries to count the number of records and to retrieve the data
    private final static String count = "select count(*) from world;";
    public static String search = "";

    // Here are some environment variables. The first one is set by default in
    // Travis, and the other we set ourselves (see the other guide)
        String isTravis = System.getenv("TRAVIS");
        String isDevelopment = System.getenv("CS314_ENV");

    private final transient Logger log = LoggerFactory.getLogger(TIPConfig.class);

    @Override
    public void buildResponse() {
        setup();
        if(narrow != null) {
            filterValues = processFilters(narrow);
        }
        fillPlaces();
        log.trace("buildResponse -> {}", this);
    }

    TIPFind() {
        this.limit = 0;
        this.found = 0;
        this.places = new ArrayList<Map>();
        this.match = "";
    }

    @Override
    public String toString(){
        return "{match: " + match + ", limit: " + limit + ", found: " + found + ", places: " + places
          + ", narrow: " + narrow;
    }

    TIPFind(String match, int limit, ArrayList<Map> places, int found, List<HashMap<String, Object>> narrow) {
        this.match = match;
        this.limit = limit;
        this.places = places;
        this.found = found;
        log.trace("Before IF NULL");
        if (narrow != null){
            log.trace("IN IS NULL");
            this.narrow = narrow;
        }
        log.trace("WORKED");
    }

    TIPFind(String match, int limit, ArrayList<Map> places, int found) {
        this.match = match;
        this.limit = limit;
        this.places = places;
        this.found = found;
        this.narrow = null;
    }


    public List<List<String>> processFilters(List<HashMap<String, Object>> narrow) {
        List<List<String>> filters = new ArrayList<>();
        namesOfValues = new ArrayList<>();
        if(narrow.size() != 0) {
            for(int i = 0; i < narrow.size(); i++) {
                String name = narrow.get(i).get("name").toString();
                namesOfValues.add(name);
                String values = String.valueOf(narrow.get(0).get("values"));
                String[] splitValues = cleanValues(values);
                filters.add(Arrays.asList(splitValues));
            }
        }
        return filters;
    }

    public String[] cleanValues(String values) {
        values = values.replaceAll("\\[|\\]", "");
        values = values.replaceAll("[^a-zA-z, ]", "");
        String[] splitValues = values.split(", ");
        return splitValues;
    }

    public void setup() {
        if(isTravis != null && isTravis.equals("true")) {
            myUrl = "jdbc:mysql://127.0.0.1/cs314";
            user = "travis";
            pass = null;
        }

        // else, use our credentials; also account for if we have our own dev
        // environment variable (see the other guide) for connecting through an SSH
        // tunnel
        else if(isDevelopment != null && isDevelopment.equals("development")) {
            myUrl = "jdbc:mysql://127.0.0.1:3306/cs314";
            user = "cs314-db";
            pass = "eiK5liet1uej";
        }

        // Else, we must be running against the production database directly
        else {
            myUrl = "jdbc:mysql://faure.cs.colostate.edu/cs314";
            user="cs314-db";
            pass="eiK5liet1uej";
        }
    }

    public String buildQuery(){

        //String query = "SET @phrase=\"" + match +  "\";\n";
        String query = "SELECT world.name, world.municipality, world.longitude, world.latitude, world.altitude FROM world INNER JOIN continent ON world.continent = continent.id INNER JOIN country ON world.iso_country = country.id " +
                "INNER JOIN region ON world.iso_region = region.id WHERE (continent.name LIKE \"%" + match +"%\" OR country.name LIKE \"%" + match +"%\" OR region.name LIKE \"%" + match +"%\" OR world.name LIKE \"%" + match + "%\" OR world.municipality LIKE \"%" + match + "%\") ";
        //String query = "select id,name,municipality,type,latitude,longitude,altitude from world where name like \'%" + match + "%\' or municipality like \'%" + match + "%\' order by name;";
        //log.trace(query);

        if(filterValues.size() != 0) {
            log.trace("not empty");
            for(int i = 0; i < filterValues.size(); i++) {
                log.trace("in for");
                query = query + "AND (" + namesOfValues.get(i) + " LIKE ";
                List<String> temp = filterValues.get(i);
                for(int j = 0; j < temp.size(); j++) {
                    query = query + "\"%" + temp.get(j) + "%\" ";
                    if(j+1 != temp.size() && temp.size() != 1) {
                        query = query + "OR " + namesOfValues.get(i) + " LIKE ";
                    }
                }
                query = query + ") ";
                // ADD OR
            }
        }

        if(this.limit != 0) {
            query = query + "LIMIT " + limit + ";";
        } else {
            query = query + ";";
        }
        log.trace(query);
        return query;
    }

    public void fillPlaces(){
        //query SOMETHING to fill places with limit items
        try  {
            Class.forName(myDriver);
            // connect to the database and query
            search = this.buildQuery();
            try (Connection conn = DriverManager.getConnection(myUrl, user, pass);
                 Statement stCount = conn.createStatement();
                 Statement stQuery = conn.createStatement();
                 ResultSet rsCount = stCount.executeQuery(count);
                 ResultSet rsQuery = stQuery.executeQuery(search)

            ) {
                printJSON(rsCount, rsQuery);
            }
        } catch (Exception e) {
            System.err.println("Exception: "+e.getMessage());
        }
    }

    private void printJSON(ResultSet count, ResultSet query) throws SQLException {
        System.out.printf("\n{\n");
        System.out.printf("\"type\": \"find\",\n");
        System.out.printf("\"title\": \"%s\",\n",search);
        System.out.printf("\"places\": [\n");
        // determine the number of results that match the query
        count.next();
        int results = count.getInt(1);

        // iterate through query results and print out the airport codes
        while (query.next()) {
            //System.out.printf("  \"%s\"", query.getString("name"));
            Map<String, String> temp = new HashMap ();
            //String id = query.getString("id");
            //temp.put("id", id);
            String name = query.getString("name");
            temp.put("name", name);
            String latitude = query.getString("latitude");
            temp.put("latitude", latitude);
            String longitude =query.getString("longitude");
            temp.put("longitude", longitude);
            String altitude = query.getString("altitude");
            temp.put("altitude", altitude);
            String municipality = query.getString("municipality");
            temp.put("municipality", municipality);
            this.places.add(temp);
            //System.out.println("name: "+ name + " " + lat + " " +id +" " +alt + " " + municipality + " " + longitude);
            if (--results == 0)
                System.out.printf("\n");
            else
                System.out.printf(",\n");
            found++;
        }
        System.out.printf("  ]\n}\n");
    }
}
