import type { BaseCellDataType, ColDef } from '@ag-grid-community/core';
import type { RatanFieldSchemaType } from '../database/field';

export const ratanFields2AgGridCol = (
  fields: RatanFieldSchemaType[],
): ColDef[] => {
  return fields.map((field) => {
    return {
      field: field.fieldSchemaKey,
      headerName: field.fieldSchemaTitle,
      sortable: true,
      cellDataType: mapCellDataType(field),
      filter: 'agMultiColumnFilter',
      filterParams: {
        filters: [
          {
            filter: mapFilter(field),
            display: 'subMenu',
            showTooltips: true,
          },
          {
            filter: 'agSetColumnFilter',
          },
        ],
      },
      resizable: true,
    };
  });
};

const mapCellDataType = (field: RatanFieldSchemaType): BaseCellDataType => {
  switch (field.fieldSchemaType) {
    case 'string':
      switch (field.fieldSchemaFormat) {
        case 'date':
        case 'time':
        case 'date-time':
          return 'dateString';

        default:
          return 'text';
      }

    case 'number':
    case 'integer':
      return 'number';

    case 'boolean':
      return 'boolean';

    default:
      break;
  }
  return 'text';
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

    case 'integer':
    case 'number':
      return 'agNumberColumnFilter';

    case 'boolean':
      return 'agBooleanColumnFilter';

    default:
      break;
  }
  return 'agTextColumnFilter';
};
