import type { ColDef } from '@ag-grid-community/core';
import type { FieldSchemaType } from '../../database/field';

export const ratanFields2AgGridCol = (fields: FieldSchemaType[]): ColDef[] => {
  return fields.map((field) => {
    return {
      field: field.fieldSchemaKey,
      headerName: field.fieldSchemaTitle,
      sortable: true,
      filter: mapFilter(field),
      resizable: true,
    };
  });
};

const mapFilter = (field: FieldSchemaType): string => {
  switch (field.fieldSchemaType) {
    case 'string':
      switch (field.fieldSchemaFormat) {
        case 'date':
        case 'time':
        case 'date-time':
          return 'agDateColumnFilter';

        default:
          return 'agTextColumnFilter';
      }

    case 'number':
      return 'agNumberColumnFilter';

    case 'boolean':
      return 'agBooleanColumnFilter';

    default:
      break;
  }
  return 'agTextColumnFilter';
};
