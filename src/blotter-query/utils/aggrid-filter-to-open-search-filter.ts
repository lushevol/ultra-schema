import type { IServerSideGetRowsRequest } from '@ag-grid-community/core';
import type { OpenSearchQuery } from '../types/open-search-query';

export const aggridFilterToOpenSearchFilter = (
  filter: IServerSideGetRowsRequest['filterModel'],
): OpenSearchQuery['filter'] => {
  if (!filter) return {};

  console.log(filter);

  return {};
};
