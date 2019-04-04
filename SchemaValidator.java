package com.tripco.t19.TIP;
package com.tripco.t19.server;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Paths;
import java.util.List;
import org.everit.json.schema.SchemaException;
import org.everit.json.schema.ValidationException;
import org.json.JSONException;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.everit.json.schema.Schema;
import org.everit.json.schema.loader.SchemaLoader;
import org.json.JSONObject;
import org.json.JSONTokener;
// ...




public class SchemaValidator {

  private static final Logger log = LoggerFactory.getLogger(SchemaValidator.class);

  SchemaValidator(JSONObject json, String path) {
      try (InputStream inputStream = getClass().getResourceAsStream("/path/to/your/schema.json")) {
      JSONObject rawSchema = new JSONObject(new JSONTokener(inputStream));
      Schema schema = SchemaLoader.load(rawSchema);
      schema.performValidation(new JSONObject("{\"hello\" : \"world\"}")); // throws a ValidationException if this object is invalid
    }
  }


  private static JSONObject parseJsonFile(String path) {
    // Here, we simply dump the contents of a file into a String (and then an object);
    // there are other ways of creating a JSONObject, like from an InputStream...
    // (https://github.com/everit-org/json-schema#quickstart)
    JSONObject parsedObject = null;
    try {
      byte[] jsonBytes = Files.readAllBytes(Paths.get(path));
      parsedObject = new JSONObject(new String(jsonBytes));
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

  private static boolean performValidation(JSONObject json, JSONObject jsonSchema) {
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
}
