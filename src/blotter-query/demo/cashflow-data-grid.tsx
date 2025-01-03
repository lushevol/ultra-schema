import type { GridReadyEvent } from '@ag-grid-community/core';
import MyAgGridRoot from '../../aggrid/components/grid-root';
import FieldsSchemas from '../../database/fields-schema';
import { useLazyQueryCashflowBlotterQuery } from '../../rtk-query/openSearchApi';
import type { ResultNew } from '../../rtk-query/types.generated';
import { ratanFields2AgGridCol } from '../../schema-utils/ratan-fields-ag-grid';
import { useAppDispatch } from '../../store';
import { setAggridEvent } from '../../store/slices/aggrid';
import { useAgGridOptions } from './useAgGridOptions';

const colDefs = ratanFields2AgGridCol(FieldsSchemas);

export const AgGridWithSchema = () => {
  const dispatch = useAppDispatch();
  const gridReadyHandler = (e: GridReadyEvent) => {
    dispatch(setAggridEvent(e));
  };
  const [queryCashflow] = useLazyQueryCashflowBlotterQuery();

  const gridOptions = useAgGridOptions<ResultNew>(
    (args) => queryCashflow(args).unwrap(),
    ({ data }) => `${data.Cashflow?.Cashflow_Id}`,
  );

  return (
    <MyAgGridRoot
      gridOptions={gridOptions}
      columnDefs={colDefs}
      onGridReady={gridReadyHandler}
      enableAdvancedFilter
    />
  );
};
