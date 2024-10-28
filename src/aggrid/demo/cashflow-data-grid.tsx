import type { GridOptions, GridReadyEvent } from '@ag-grid-community/core';
import FieldsSchemas from '../../database/fields-schema';
import { ratanFields2AgGridCol } from '../../schema-utils/ratan-fields-ag-grid';
import MyAgGridRoot from '../components/grid-root';
import { serverSideDataSource } from '../components/grid-root/ssr';
import { useAppDispatch } from '../../store';
import { setAggridEvent } from '../../store/slices/aggrid';

const colDefs = ratanFields2AgGridCol(FieldsSchemas);

const gridOptions: GridOptions = {
  rowModelType: 'serverSide',
  pagination: true,
  paginationPageSize: 20,
  serverSideDatasource: serverSideDataSource,
};

export const AgGridWithSchema = () => {
  const dispatch = useAppDispatch();
  const gridReadyHandler = (e: GridReadyEvent) => {
    dispatch(setAggridEvent(e));
  };
  return (
    <MyAgGridRoot
      gridOptions={gridOptions}
      columnDefs={colDefs}
      onGridReady={gridReadyHandler}
      enableAdvancedFilter
    />
  );
};
