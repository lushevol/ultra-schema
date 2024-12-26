package com.ratanone.shuaipoc.controller;

import com.networknt.schema.ValidationMessage;
import com.ratanone.shuaipoc.model.JSONSchemaValidationResult;
import com.ratanone.shuaipoc.services.JSONSchemaService;
import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/json-schema")
public class JSONSchemaController {
  @Autowired private JSONSchemaService jsonSchemaService;

  @PostMapping("/validate")
  public ResponseEntity<JSONSchemaValidationResult> validate(
      @RequestBody String jsonSchema, @RequestBody String jsonData) {
    List<ValidationMessage> validationMessages = jsonSchemaService.validate(jsonSchema, jsonData);

    return ResponseEntity.ok(
        new JSONSchemaValidationResult(validationMessages.isEmpty(), validationMessages));
  }
}
