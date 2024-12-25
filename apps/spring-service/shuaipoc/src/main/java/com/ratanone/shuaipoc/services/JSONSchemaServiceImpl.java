package com.ratanone.shuaipoc.services;

import com.networknt.schema.*;
import org.springframework.stereotype.Service;

@Service
public class JSONSchemaServiceImpl implements JSONSchemaService {
  public List<ValidationMessage> validate(String jsonSchema, String jsonData) {
    // This creates a schema factory that will use Draft v7 as the default if $schema is not
    // specified
    // in the schema data. If $schema is specified in the schema data then that schema dialect will
    // be used
    // instead and this version is ignored.
    JsonSchemaFactory jsonSchemaFactory = JsonSchemaFactory.getInstance(SpecVersion.VersionFlag.V7);

    SchemaValidatorsConfig.Builder builder = SchemaValidatorsConfig.builder();
    // By default the JDK regular expression implementation which is not ECMA 262 compliant is used
    // Note that setting this requires including optional dependencies
    // builder.regularExpressionFactory(GraalJSRegularExpressionFactory.getInstance());
    // builder.regularExpressionFactory(JoniRegularExpressionFactory.getInstance());
    SchemaValidatorsConfig config = builder.build();

    // Due to the mapping the schema will be retrieved from the classpath at
    // classpath:schema/example-main.json.
    // If the schema data does not specify an $id the absolute IRI of the schema location will be
    // used as the $id.
    JsonSchema schema = jsonSchemaFactory.getSchema(jsonSchema, config);

    Set<ValidationMessage> validationMessages =
        schema.validate(
            jsonData,
            InputFormat.JSON,
            executionContext -> {
              // By default since Draft 2019-09 the format keyword only generates annotations and
              // not assertions
              executionContext.getExecutionConfig().setFormatAssertionsEnabled(true);
            });

    return validationMessages.stream().collect(Collectors.toList());
  }
}
