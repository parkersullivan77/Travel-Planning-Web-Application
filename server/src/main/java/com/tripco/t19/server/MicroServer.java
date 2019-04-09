package com.tripco.t19.server;

import com.google.gson.Gson;

import com.google.gson.JsonObject;
import com.tripco.t19.TIP.TIPConfig;
import com.tripco.t19.TIP.TIPDistance;
import com.tripco.t19.TIP.TIPHeader;
import com.tripco.t19.TIP.TIPItinerary;
import com.tripco.t19.TIP.TIPFind;
import java.io.BufferedReader;
import java.io.InputStreamReader;
import java.lang.reflect.Type;
import java.util.ArrayList;

import org.json.JSONObject;
import spark.Request;
import spark.Response;
import spark.Spark;

import static spark.Spark.init;
import static spark.Spark.secure;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import java.io.IOException;

import java.nio.file.Files;
import java.nio.file.Paths;
import java.util.List;
import org.everit.json.schema.SchemaException;
import org.everit.json.schema.ValidationException;
import org.json.JSONException;
import java.io.InputStream;

import org.everit.json.schema.Schema;
import org.everit.json.schema.loader.SchemaLoader;
import org.json.JSONTokener;
import java.util.Arrays;

/** A micro server for a single page web application that serves the static files
 * and processes restful API requests.
 */
class MicroServer {

  private final Logger log = LoggerFactory.getLogger(MicroServer.class);

  MicroServer(int serverPort) {
    configureServer(serverPort);
    serveStaticPages();
    processRestfulAPIrequests();
    log.info("MicroServer running on port: {}", serverPort);
  }


  private void configureServer(int serverPort) {
    Spark.port(serverPort);
    String keystoreFile = System.getenv("KEYSTORE_FILE");
    String keystorePassword = System.getenv("KEYSTORE_PASSWORD");
    if (keystoreFile != null && keystorePassword != null) {
      secure(keystoreFile, keystorePassword, null, null);
      log.info("Keystore file: {}", keystoreFile);
      log.info("Keystore password: {}", keystorePassword);
      log.info("MicroServer using HTTPS.");
    }
    else {
      log.info("MicroServer using HTTP.");
    }
    log.trace("Server configuration complete");
  }


  private void serveStaticPages() {
    String path = "/public/";
    Spark.staticFileLocation(path);
    Spark.get("/", (req, res) -> { res.redirect("index.html"); return null; });
    log.trace("Static file configuration complete");
  }


  private void processRestfulAPIrequests() {
    Spark.get("/api/config", this::processTIPconfigRequest);
    Spark.post("/api/distance", this::processTIPdistanceRequest);
    Spark.post("/api/itinerary", this::processTIPitineraryRequest);
    Spark.post("/api/find",this::processTIPfindRequest);
    Spark.get("/api/echo", this::echoHTTPrequest);
    log.trace("Restful configuration complete");
  }


  private String processTIPconfigRequest(Request request, Response response) {
    log.info("TIP Config request: {}", HTTPrequestToJson(request));
    response.type("application/json");
    response.header("Access-Control-Allow-Origin", "*");
    response.status(200);
    try {
      Gson jsonConverter = new Gson();
      TIPConfig tipRequest = new TIPConfig();
      tipRequest.buildResponse();
      String responseBody = jsonConverter.toJson(tipRequest);
      log.trace("TIP Config response: {}", responseBody);
      return responseBody;
    } catch (Exception e) {
      log.error("Exception: {}", e);
      response.status(500);
      return request.body();
    }
  }


  private String processTIPdistanceRequest(Request request, Response response) {
    return processTIPrequest(TIPDistance.class, request, response);
  }
  private String processTIPitineraryRequest(Request request, Response response) {
    return processTIPrequest(TIPItinerary.class, request, response);
  }
  private String processTIPfindRequest(Request request, Response response) {
    return processTIPrequest(TIPFind.class, request, response);
  }



  private String processTIPrequest(Type tipType, Request request, Response response) {


    log.info("TIP Request: {}", HTTPrequestToJson(request));
    response.type("application/json");
    response.header("Access-Control-Allow-Origin", "*");
    response.status(200);
    try {
      Gson jsonConverter = new Gson();
      TIPHeader tipRequest = jsonConverter.fromJson(request.body(), tipType);
      tipRequest.buildResponse();
      String responseBody = jsonConverter.toJson(tipRequest);
      log.trace("TIP Response: {}", responseBody);

      String SchemaPath  = "";  //This will be set to the schema path depending on request type
      if(tipType == TIPDistance.class){
        SchemaPath = "/TIPDistanceRequestSchema.json";
        String [] testArray = getStringsFromFile("/TIPDistanceScheme.json");  //should find it in server in /resources
        JSONObject TIPDistanceObject = new JSONObject(request.body());  //json object to compare with schema

        //JSONObject schema = parseJsonFile(SchemaPath);  <--- causing error due to file path
        // performValidation(TIPDistanceObject,schema);  //validate and you're done
      }
      else if(tipType == TIPItinerary.class) {
        SchemaPath = "/TIPItineraryRequestSchema.json";
        log.debug("Tipitinerary");
      }
      else if(tipType == TIPFind.class){
        SchemaPath = "/TIPFindRequestSchema.json";
        log.debug("Tipfind");

      }

      return responseBody;
    }
    catch (Exception e) {
      log.error("Exception: {}", e);
      response.status(500);
      return request.body();
    }
    //deal with 400 exception below

  }


  private String echoHTTPrequest(Request request, Response response) {
    response.type("application/json");
    response.header("Access-Control-Allow-Origin", "*");
    return HTTPrequestToJson(request);
  }


  //Converts an HTTP request to Json string
  private String HTTPrequestToJson(Request request) {
    return "{\n"
        + "\"attributes\":\"" + request.attributes() + "\",\n"
        + "\"body\":\"" + request.body() + "\",\n"
        + "\"contentLength\":\"" + request.contentLength() + "\",\n"
        + "\"contentType\":\"" + request.contentType() + "\",\n"
        + "\"contextPath\":\"" + request.contextPath() + "\",\n"
        + "\"cookies\":\"" + request.cookies() + "\",\n"
        + "\"headers\":\"" + request.headers() + "\",\n"
        + "\"host\":\"" + request.host() + "\",\n"
        + "\"ip\":\"" + request.ip() + "\",\n"
        + "\"params\":\"" + request.params() + "\",\n"
        + "\"pathInfo\":\"" + request.pathInfo() + "\",\n"
        + "\"serverPort\":\"" + request.port() + "\",\n"
        + "\"protocol\":\"" + request.protocol() + "\",\n"
        + "\"queryParams\":\"" + request.queryParams() + "\",\n"
        + "\"requestMethod\":\"" + request.requestMethod() + "\",\n"
        + "\"scheme\":\"" + request.scheme() + "\",\n"
        + "\"servletPath\":\"" + request.servletPath() + "\",\n"
        + "\"session\":\"" + request.session() + "\",\n"
        + "\"uri()\":\"" + request.uri() + "\",\n"
        + "\"url()\":\"" + request.url() + "\",\n"
        + "\"userAgent\":\"" + request.userAgent() + "\"\n"
        + "}";
  }


  private boolean performValidation(JSONObject json, JSONObject jsonSchema) {
    boolean validationResult = true;
    try {
      Schema schema = SchemaLoader.load(jsonSchema);
      // This is the line that will throw a ValidationException if anything doesn't conform to the schema!
      schema.validate(json);
    }
    catch (SchemaException e) {
      log.error("Caught a schema exception!");
      e.printStackTrace();
      validationResult = false;
    }
    catch (ValidationException e) {
      log.error("Caught validation exception when validating schema! Root message: {}", e.getErrorMessage());
      log.error("All messages from errors (including nested):");
      // For now, messages are probably just good for debugging, to see why something failed
      List<String> allMessages = e.getAllMessages();
      for (String message : allMessages) {
        log.error(message);
      }
      validationResult = false;
    }
    finally {
      return validationResult;
    }
  }
  public String[] getStringsFromFile(String filename) {
    ArrayList<String> retVals = new ArrayList<>();
    BufferedReader read;
    try{
      read = new BufferedReader(new InputStreamReader(getClass().getResourceAsStream(filename)));
    }
    catch(Exception e){
      return new String[0];
    }
    String line = "";
    try{
      while((line = read.readLine()) != null) {
        retVals.add(line);
        }
    }
    catch (Exception e){}
    return retVals.toArray(new String[retVals.size()]);
  }



  private JSONObject parseJsonFile(String path) {
    // Here, we simply dump the contents of a file into a String (and then an object);
    // there are other ways of creating a JSONObject, like from an InputStream...
    // (https://github.com/everit-org/json-schema#quickstart)
    JSONObject parsedObject = null;
    try {
     InputStream inputStream = getClass().getResourceAsStream(path);
     JSONObject rawSchema = new JSONObject(new JSONTokener(inputStream));
      byte[] jsonBytes = Files.readAllBytes(Paths.get(path));
      parsedObject = rawSchema;
    }
    catch (IOException e) {
      log.error("Caught exception when reading files!");
      e.printStackTrace();
    }
    catch (JSONException e) {
      log.error("Caught exception when constructing JSON objects!");
      e.printStackTrace();
    }
    finally {
      return parsedObject;
    }
  }

}
