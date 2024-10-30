import type { GridOptions, GridReadyEvent } from '@ag-grid-community/core';
import FieldsSchemas from '../../database/fields-schema';
import { ratanFields2AgGridCol } from '../../schema-utils/ratan-fields-ag-grid';
import MyAgGridRoot from '../components/grid-root';
import { useAppDispatch } from '../../store';
import { setAggridEvent } from '../../store/slices/aggrid';
import type { SettlementSchemaRootType } from '../../rtk-query/types.generated';
import { aggridSortToOpenSearchSort } from '../../blotter-query/utils/aggrid-sort-to-open-search-sort';
import { useLazyQueryCashflowBlotterQuery } from '../../rtk-query/openSearchApi';
import { aggridFilterToOpenSearchFilter } from '../../blotter-query/utils/aggrid-filter-to-open-search-filter';

const colDefs = ratanFields2AgGridCol(FieldsSchemas);

const DEFAULT_PAGE_SIZE = 100;

export const AgGridWithSchema = () => {
  const dispatch = useAppDispatch();
  const gridReadyHandler = (e: GridReadyEvent) => {
    dispatch(setAggridEvent(e));
  };
  const [queryCashflow] = useLazyQueryCashflowBlotterQuery();

  const gridOptions: GridOptions<SettlementSchemaRootType> = {
    // getRowId: ({ data }) => `${data.Cashflow?.Cashflow_Id}`,
    rowSelection: {
      mode: 'multiRow',
    },

    // side bar
    sideBar: {
      toolPanels: [
        {
          id: 'columns',
          labelDefault: 'Columns',
          labelKey: 'columns',
          iconKey: 'columns',
          toolPanel: 'agColumnsToolPanel',
          toolPanelParams: {
            suppressRowGroups: true,
            suppressValues: true,
            suppressPivots: true,
            suppressPivotMode: true,
          },
        },
      ],
      defaultToolPanel: 'columns',
    },
    allowDragFromColumnsToolPanel: true,

    // ssrm
    rowModelType: 'serverSide',
    pagination: true,
    paginationPageSize: DEFAULT_PAGE_SIZE,
    serverSideDatasource: {
      getRows(params) {
        const { api, request, success, fail } = params;
        const queryFields =
          api.getColumns()?.map((col) => col.getColId()) || [];
        const filterModel = request.filterModel;
        const sortModel = request.sortModel;
        const filters = aggridFilterToOpenSearchFilter(filterModel);
        const orderArgs = aggridSortToOpenSearchSort(sortModel);
        const pageSize = api.paginationGetPageSize();
        const pageNo = api.paginationGetCurrentPage() + 1;
        queryCashflow({
          filters,
          queryFields,
          orderArgs,
          pagingOption: 'PAGE_INDEX',
          itemsPerPage: pageSize,
          pageIndex: pageNo,
        })
          .unwrap()
          .then((data) => {
            success({
              rowData: data.results,
              rowCount: data.totalResult,
            });
          })
          .catch(() => {
            fail();
          });
      },
    },
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
