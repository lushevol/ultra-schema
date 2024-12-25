package com.ratanone.shuaipoc.services;

public interface JSONSchemaService {
  public List<ValidationMessage> validate(String jsonSchema, String jsonData);
}
