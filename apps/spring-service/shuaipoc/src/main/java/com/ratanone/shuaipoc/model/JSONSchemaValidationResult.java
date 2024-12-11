package com.ratanone.shuaipoc.model;

import com.networknt.schema.ValidationMessage;
import java.util.List;

public class JSONSchemaValidationResult {
  private boolean valid;
  private List<ValidationMessage> messages;

  public JSONSchemaValidationResult(boolean valid, List<ValidationMessage> messages) {
    this.valid = valid;
    this.messages = messages;
  }
}
