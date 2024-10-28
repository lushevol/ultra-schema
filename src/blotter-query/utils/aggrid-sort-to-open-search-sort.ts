import type { IServerSideGetRowsRequest } from '@ag-grid-community/core';
import type { OpenSearchQuery } from '../types/open-search-query';

export const aggridSortToOpenSearchSort = (
  sortModel: IServerSideGetRowsRequest['sortModel'],
): OpenSearchQuery['orderArgs'] => {
  if (!sortModel) return [];
  return sortModel.map((model) => ({
    orderField: model.colId,
    orderType: String.prototype.toUpperCase.call(model.sort) as 'ASC' | 'DESC',
  }));
};
