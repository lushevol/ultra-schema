import type { IServerSideDatasource } from '@ag-grid-community/core';
import { mockOpenSearchQuery } from '../../../rtk-query/mockApi';
import { aggridFilterToOpenSearchFilter } from '../../../blotter-query/utils/aggrid-filter-to-open-search-filter';

export const serverSideDataSource: IServerSideDatasource = {
  getRows(params) {
    const { api, context, request, success, fail } = params;
    const queryFields = api.getColumns()?.map((col) => col.getColId()) || [];
    const pageSize = api.paginationGetPageSize();
    const pageNo = api.paginationGetCurrentPage();
    mockOpenSearchQuery({
      filters: aggridFilterToOpenSearchFilter(request.filterModel),
      orderArgs: [],
      pagingOption: 'PAGE_INDEX',
      cursor: '',
      pageIndex: pageNo,
      itermsPerPage: pageSize,
      queryFields,
    })
      .then((result) => {
        success({
          rowData: result.results,
          rowCount: result.totalResult,
        });
      })
      .catch((error) => {
        fail();
      });
  },
};
