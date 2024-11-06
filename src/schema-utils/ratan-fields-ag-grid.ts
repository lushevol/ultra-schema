import type { ColDef } from '@ag-grid-community/core';
import type { RatanFieldSchemaType } from '../database/field';

export const ratanFields2AgGridCol = (
  fields: RatanFieldSchemaType[],
): ColDef[] => {
  return fields.map((field) => {
    return {
      field: field.fieldSchemaKey,
      headerName: field.fieldSchemaTitle,
      sortable: true,
      filter: "agMultiColumnFilter",
      filterParams: {
        filters: [
          {
            filter: mapFilter(field),
            display: "subMenu",
            showTooltips: true
          },
          {
            filter: "agSetColumnFilter",
          }
        ],
      },
      resizable: true,
    };
  });
};

const mapFilter = (field: RatanFieldSchemaType): string => {
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
