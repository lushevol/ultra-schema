import type {
  OpenSearchQuery,
  OpenSearchResult,
} from '../blotter-query/types/open-search-query';
import Cashflows from '../database/cashflow';
import type { SettlementSchemaRootType } from './types.generated';

export const mockOpenSearchQuery = async (
  queryArgs: OpenSearchQuery,
): Promise<OpenSearchResult<SettlementSchemaRootType>> => {
  console.log(queryArgs);
  return {
    totalResult: Cashflows.length,
    pageIndex: queryArgs.pageIndex,
    itemsPerPage: queryArgs.itemsPerPage,
    pagingCursors: null,
    results: Cashflows,
  };
};
