package com.ratanone.shuaipoc.model;

public class JSONSchemaValidationRequest {
    public String jsonSchema;
    public String jsonData;

    public String getJsonSchema() {
        return jsonSchema;
    }

    public void setJsonSchema(String jsonSchema) {
        this.jsonSchema = jsonSchema;
    }

    public String getJsonData() {
        return jsonData;
    }

    public void setJsonData(String jsonData) {
        this.jsonData = jsonData;
    }
}
