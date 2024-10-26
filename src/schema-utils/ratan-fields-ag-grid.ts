import type { ColDef } from '@ag-grid-community/core';
import type { FieldSchemaType } from '../database/field';

export const ratanFields2AgGridCol = (fields: FieldSchemaType[]): ColDef[] => {
  return fields.map((field) => {
    return {
      field: field.fieldSchemaKey,
      headerName: field.fieldSchemaTitle,
      sortable: true,
      filter: true,
      resizable: true,
    };
  });
};
