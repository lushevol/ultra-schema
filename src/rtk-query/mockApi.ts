import type {
  OpenSearchQuery,
  OpenSearchResult,
} from '../blotter-query/types/open-search-query';
import Cashflows from '../database/cashflow';

export const mockOpenSearchQuery = async (
  queryArgs: OpenSearchQuery,
): Promise<OpenSearchResult> => {
  console.log(queryArgs);
  return {
    totalResult: Cashflows.length,
    pageIndex: queryArgs.pageIndex,
    itermsPerPage: queryArgs.itermsPerPage,
    pagingCursors: null,
    results: Cashflows,
  };
};
