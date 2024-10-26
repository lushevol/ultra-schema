import type { JSONSchema7, JSONSchema7Definition } from 'json-schema';
import type { FieldSchemaType } from '../database/field';

/**
 * Convert a list of RatanFieldSchemaType objects into a JSON schema
 * This is typically used to generate a JSON schema that describes the
 * structure of the data in the Ratan database.
 * @param rfs - a list of RatanFieldSchemaType objects
 * @returns a JSON schema that describes the structure of the fields in rfs
 */
export const ratanFields2JsonSchema = (rfs: FieldSchemaType[]): JSONSchema7 => {
  const schema: JSONSchema7 = {
    type: 'object',
    properties: {},
  };

  for (const cur of rfs) {
    const keys = cur.fieldSchemaKey.split('.');
    let current = schema.properties ?? {};
    keys.forEach((key, index) => {
      if (index !== keys.length - 1) {
        current[key] = current[key] || {
          type: 'object',
          properties: {},
        };
        current = (current[key] as JSONSchema7).properties ?? {};
      } else {
        const valuesProps: JSONSchema7Definition = cur.fieldSchemaValuesType
          ? {
              [cur.fieldSchemaValuesType]: cur.fieldSchemaValues,
            }
          : {};
        current[key] = {
          title: cur.fieldSchemaTitle,
          // description: cur.fieldSchemaDescription,
          type: cur.fieldSchemaType,
          ...(cur.fieldSchemaFormat ? { format: cur.fieldSchemaFormat } : {}),
          ...valuesProps,
        };
      }
    });
  }

  return schema;
};
