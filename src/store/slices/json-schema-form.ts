import { type PayloadAction, createSlice } from '@reduxjs/toolkit';
import type { JSONSchema7 } from 'json-schema';
import ssi_form_json_schema from '../../json-schema-form/demo/ssi-form/schema/ssi-form-json-schema.json';

const schema = ssi_form_json_schema as unknown as JSONSchema7;

type JsonSchemaFormRootType = {
  schema: JSONSchema7;
};

export const jsonSchemaFormSlice = createSlice({
  name: 'jsonSchemaForm',
  initialState: {
    schema,
  } as JsonSchemaFormRootType,
  reducers: {
    setJsonSchemaFormSchema: (state, action: PayloadAction<JSONSchema7>) => {
      state.schema = action.payload;
    },
  },
});

export const { setJsonSchemaFormSchema } = jsonSchemaFormSlice.actions;
export default jsonSchemaFormSlice.reducer;
