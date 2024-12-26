package com.ratanone.shuaipoc.services;

import com.networknt.schema.ValidationMessage;
import java.util.List;

public interface JSONSchemaService {
  public List<ValidationMessage> validate(String jsonSchema, String jsonData);
}
