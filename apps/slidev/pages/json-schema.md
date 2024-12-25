# JSON Schema and Settlement Cases

## What is JSON Schema

JSON Schema is a powerful tool for annotating and validating JSON data.

- It's a standard for describing the structure of JSON data. In fact, it's also a JSON.
- It's drafted by [specification](https://json-schema.org/) and implemented by many languages and tools. it's none related to any language.

### Example

**1. user register**

new users register to our system, they need to provide the following information:

|field|type|format|required|options|
|--|--|--|--|--|
|username|string|-|true|-|
|gender|string|-|false|male,female|
|email|string|email|true|-|
|age|number|-|false|-|

JSON Schema:

```json
{
  "type": "object",
  "properties": {
    "username": { "type": "string" },
    "gender": { "type": "string", "enum": ["male", "female"] },
    "email": { "type": "string", "format": "email" },
    "age": { "type": "number" }
  },
  "required": ["username", "email"]
}
```

## JSON Schema technical details



## JSON Schema in Settlement Cases

### 1. SSI Form Validation

*Before*

- Self Designed Logic and Implementation
- Not easy to understand and maintain and test
- Not easy to extend
- UI and BE are not aligned

*After*

- Use JSON Schema to validate the SSI form
- Easy to understand and maintain and test
- Easy to extend
- UI and BE are aligned

### 2. Form UI Generation

- generate SSI form UI from JSON Schema
- generate BIC Netting Static UI from JSON Schema

### 3. Field Management Optimization

- design the field management schema base on JSON Schema
- Generate fields validator and graphql
