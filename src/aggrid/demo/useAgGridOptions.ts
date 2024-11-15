import type { GridOptions } from '@ag-grid-community/core';
import type {
  OpenSearchQuery,
  OpenSearchResult,
} from '../../blotter-query/types/open-search-query';
import { aggridFilterToOpenSearchFilter } from '../../blotter-query/utils/aggrid-filter-to-open-search-filter';
import { aggridSortToOpenSearchSort } from '../../blotter-query/utils/aggrid-sort-to-open-search-sort';
import type { SettlementSchemaRootType } from '../../rtk-query/types.generated';

const DEFAULT_PAGE_SIZE = 100;

export const useAgGridOptions = <T>(
  queryCashflow: (
    args: OpenSearchQuery,
  ) => Promise<OpenSearchResult<SettlementSchemaRootType>>,
  getRowId: GridOptions<T>['getRowId'],
) => {
  const gridOptions: GridOptions<T> = {
    getRowId,
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
      // defaultToolPanel: 'columns',
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
          api
            .getColumns()
            ?.filter((col) => col.isVisible())
            .map((col) => col.getColId()) || [];
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

  return gridOptions;
};
