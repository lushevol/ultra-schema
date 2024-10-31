import type { GridOptions, GridReadyEvent } from '@ag-grid-community/core';
import { aggridFilterToOpenSearchFilter } from '../../blotter-query/utils/aggrid-filter-to-open-search-filter';
import { aggridSortToOpenSearchSort } from '../../blotter-query/utils/aggrid-sort-to-open-search-sort';
import FieldsSchemas from '../../database/fields-schema';
import { useLazyQueryCashflowBlotterQuery } from '../../rtk-query/openSearchApi';
import type { SettlementSchemaRootType } from '../../rtk-query/types.generated';
import { ratanFields2AgGridCol } from '../../schema-utils/ratan-fields-ag-grid';
import { useAppDispatch } from '../../store';
import { setAggridEvent } from '../../store/slices/aggrid';
import MyAgGridRoot from '../components/grid-root';
import { useAgGridOptions } from './useAgGridOptions';

const colDefs = ratanFields2AgGridCol(FieldsSchemas);

export const AgGridWithSchema = () => {
  const dispatch = useAppDispatch();
  const gridReadyHandler = (e: GridReadyEvent) => {
    dispatch(setAggridEvent(e));
  };
  const [queryCashflow] = useLazyQueryCashflowBlotterQuery();

  const gridOptions = useAgGridOptions(queryCashflow);

  return (
    <MyAgGridRoot
      gridOptions={gridOptions}
      columnDefs={colDefs}
      onGridReady={gridReadyHandler}
      enableAdvancedFilter
    />
  );
};
