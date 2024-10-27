import type { GridOptions } from '@ag-grid-community/core';
import FieldsSchemas from '../../../database/fields-schema';
import { ratanFields2AgGridCol } from '../../utils/ratan-fields-ag-grid';
import MyAgGridRoot from '../grid-root';
import { serverSideDataSource } from '../grid-root/ssr';

const colDefs = ratanFields2AgGridCol(FieldsSchemas);

const gridOptions: GridOptions = {
  rowModelType: 'serverSide',
  pagination: true,
  paginationPageSize: 20,
  serverSideDatasource: serverSideDataSource,
};

export const AgGridWithSchema = () => {
  return <MyAgGridRoot gridOptions={gridOptions} columnDefs={colDefs} />;
};
