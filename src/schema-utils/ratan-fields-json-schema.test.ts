import { ratanFields2JsonSchema } from './ratan-fields-json-schema';
import type { FieldSchemaType } from '../database/field';

describe('ratanFields2JsonSchema', () => {
  it('should return an empty schema for an empty list of FieldSchemaType objects', () => {
    const rfs: FieldSchemaType[] = [];
    const schema = ratanFields2JsonSchema(rfs);
    expect(schema).toEqual({
      type: 'object',
      properties: {},
    });
  });

  it('should return a schema with a single property for a single FieldSchemaType object', () => {
    const rfs: FieldSchemaType[] = [
      {
        fieldSchemaKey: 'foo',
        fieldSchemaType: 'string',
        id: '',
        fieldSchemaTitle: '',
        fieldSchemaFormat: '',
        fieldSchemaValues: [],
        fieldSchemaValuesType: null,
        enable_in: [],
        business_config: '',
      },
    ];
    const schema = ratanFields2JsonSchema(rfs);
    expect(schema).toEqual({
      type: 'object',
      properties: {
        foo: {
          type: 'string',
        },
      },
    });
  });

  it('should return a schema with multiple properties for multiple FieldSchemaType objects', () => {
    const rfs: FieldSchemaType[] = [
      {
        fieldSchemaKey: 'foo',
        fieldSchemaType: 'string',
        id: '',
        fieldSchemaTitle: '',
        fieldSchemaFormat: '',
        fieldSchemaValues: [],
        fieldSchemaValuesType: null,
        enable_in: [],
        business_config: '',
      },
      {
        fieldSchemaKey: 'bar',
        fieldSchemaType: 'integer',
        id: '',
        fieldSchemaTitle: '',
        fieldSchemaFormat: '',
        fieldSchemaValues: [],
        fieldSchemaValuesType: null,
        enable_in: [],
        business_config: '',
      },
    ];
    const schema = ratanFields2JsonSchema(rfs);
    expect(schema).toEqual({
      type: 'object',
      properties: {
        foo: {
          type: 'string',
        },
        bar: {
          type: 'integer',
        },
      },
    });
  });

  it('should return a schema with nested properties for nested FieldSchemaType objects', () => {
    const rfs: FieldSchemaType[] = [
      {
        fieldSchemaKey: 'foo.bar',
        fieldSchemaType: 'string',
        id: '',
        fieldSchemaTitle: '',
        fieldSchemaFormat: '',
        fieldSchemaValues: [],
        fieldSchemaValuesType: null,
        enable_in: [],
        business_config: '',
      },
    ];
    const schema = ratanFields2JsonSchema(rfs);
    expect(schema).toEqual({
      type: 'object',
      properties: {
        foo: {
          type: 'object',
          properties: {
            bar: {
              type: 'string',
            },
          },
        },
      },
    });
  });

  it('should return a schema with enum values for FieldSchemaType objects having enum values', () => {
    const rfs: FieldSchemaType[] = [
      {
        fieldSchemaKey: 'foo',
        fieldSchemaType: 'string',
        fieldSchemaValues: ['a', 'b', 'c'],
        id: '',
        fieldSchemaTitle: '',
        fieldSchemaFormat: '',
        fieldSchemaValuesType: null,
        enable_in: [],
        business_config: '',
      },
    ];
    const schema = ratanFields2JsonSchema(rfs);
    expect(schema).toEqual({
      type: 'object',
      properties: {
        foo: {
          type: 'string',
          enum: ['a', 'b', 'c'],
        },
      },
    });
  });

  it('should return a schema with different data types for FieldSchemaType objects having different data types', () => {
    const rfs: FieldSchemaType[] = [
      {
        fieldSchemaKey: 'foo',
        fieldSchemaType: 'string',
        id: '',
        fieldSchemaTitle: '',
        fieldSchemaFormat: '',
        fieldSchemaValues: [],
        fieldSchemaValuesType: null,
        enable_in: [],
        business_config: '',
      },
      {
        fieldSchemaKey: 'bar',
        fieldSchemaType: 'integer',
        id: '',
        fieldSchemaTitle: '',
        fieldSchemaFormat: '',
        fieldSchemaValues: [],
        fieldSchemaValuesType: null,
        enable_in: [],
        business_config: '',
      },
      {
        fieldSchemaKey: 'baz',
        fieldSchemaType: 'boolean',
        id: '',
        fieldSchemaTitle: '',
        fieldSchemaFormat: '',
        fieldSchemaValues: [],
        fieldSchemaValuesType: null,
        enable_in: [],
        business_config: '',
      },
    ];
    const schema = ratanFields2JsonSchema(rfs);
    expect(schema).toEqual({
      type: 'object',
      properties: {
        foo: {
          type: 'string',
        },
        bar: {
          type: 'integer',
        },
        baz: {
          type: 'boolean',
        },
      },
    });
  });
});
