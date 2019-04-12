package com.tripco.t19.TIP;
import com.google.gson.Gson;
import com.google.gson.JsonObject;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import java.sql.ResultSet;
import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.Statement;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

public class TIPFind extends TIPHeader{

    protected String match;
    protected int limit;
    protected int found;
    protected ArrayList<Map> places;


    // db configuration information
    private final static String myDriver = "com.mysql.jdbc.Driver";
    private transient String myUrl = "";
    private transient String user="cs314-db";
    private transient String pass="eiK5liet1uej";

    // fill in SQL queries to count the number of records and to retrieve the data
    private final static String count = "select count(*) from colorado;";
    public static String search = "";

    // Here are some environment variables. The first one is set by default in
    // Travis, and the other we set ourselves (see the other guide)
        String isTravis = System.getenv("TRAVIS");
        String isDevelopment = System.getenv("CS314_ENV");

    private final transient Logger log = LoggerFactory.getLogger(TIPConfig.class);

    @Override
    public void buildResponse() {
        //this.places = new List<Map>();
        setup();
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
        return "{match: " + match + ", limit: " + limit + ", found: " + found + ", places:" + places ;
    }

    TIPFind(String match, int limit, ArrayList<Map> places, int found){
        this.match = match;
        this.limit = limit;
        this.places = places;
        this.found = found;
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
        String query = "select id,name,municipality,type,latitude,longitude,altitude from colorado where name like \'%" + match + "%\' or municipality like \'%" + match + "%\' order by name;";
        //log.trace(query);
        if(this.limit != 0) {
            query = "select id,name,municipality,type,latitude,longitude,altitude from colorado where name like \'%" + match + "%\' or municipality like \'%" + match + "%\' order by name limit " + Integer.toString(limit) + ";";
        }
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
        List<String> chicken;
        while (query.next()) {
            //System.out.printf("  \"%s\"", query.getString("name"));
            Map<String, String> temp = new HashMap ();
            JsonObject json = new JsonObject();
            String id = query.getString("id");
            temp.put("id", id);
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
