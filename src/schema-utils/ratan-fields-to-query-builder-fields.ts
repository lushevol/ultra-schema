import type { Field } from 'react-querybuilder';
import type { RatanFieldSchemaType } from '../database/field';
import { schemaValues2ComponentOptions } from './schema-values-handler';

export const ratanFields2QueryBuilderFields = (
  fields: RatanFieldSchemaType[],
): Field[] => {
  return fields.map((field) => {
    return {
      name: field.fieldSchemaKey,
      label: field.fieldSchemaTitle,
      values: schemaValues2ComponentOptions(
        field.fieldSchemaValues,
      ) as Field['values'],
    };
  });
};
