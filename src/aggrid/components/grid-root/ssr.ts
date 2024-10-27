import type { IServerSideDatasource } from '@ag-grid-community/core';
import { mockOpenSearchQuery } from '../../../rtk-query/mockApi';
import { aggridFilterToOpenSearchFilter } from '../../../blotter-query/utils/aggrid-filter-to-open-search-filter';

export const serverSideDataSource: IServerSideDatasource = {
  getRows(params) {
    const { api, context, request, success, fail } = params;
    console.log(params);
    const pageSize = api.paginationGetPageSize();
    const pageNo = api.paginationGetCurrentPage();
    mockOpenSearchQuery({
      filter: aggridFilterToOpenSearchFilter(request.filterModel),
      sort: [],
      index: pageNo,
      size: pageSize,
    })
      .then((result) => {
        success({
          rowData: result.data,
          rowCount: result.total,
        });
      })
      .catch((error) => {
        fail();
      });
  },
};
