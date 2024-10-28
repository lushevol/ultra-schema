import type { JSONSchema7Type, JSONSchema7TypeName } from 'json-schema';

type FieldContext = 'CASHFLOW_DATA' | 'RATAN_DATA';

export type FieldType = {
  id: string;
  indexedTerm: string;
  businessTerm: string;
  dataType: string;
  subSelection: string;
  context: FieldContext[];
};

type FieldSchemaValuesType = 'enum' | 'examples' | '' | null;

export type RatanFieldSchemaType = {
  id: string;
  fieldSchemaKey: string;
  fieldSchemaTitle: string;
  fieldSchemaType: JSONSchema7TypeName | JSONSchema7TypeName[]; // json schema type
  fieldSchemaFormat: string; // json schema format
  fieldSchemaValues: (string | number | boolean)[];
  fieldSchemaValuesType: FieldSchemaValuesType;
  tags: string[];
  config: string; // yaml
};

export type FreeConfigType = {
  id: string;
  module: string;
  key: string;
  value: string;
};
