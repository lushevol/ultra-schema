import type {
  OpenSearchQuery,
  OpenSearchResult,
} from '../blotter-query/types/open-search-query';
import Cashflows from '../database/cashflow';

export const mockOpenSearchQuery = async (
  queryArgs: OpenSearchQuery,
): Promise<OpenSearchResult> => {
  return {
    total: Cashflows.length,
    data: Cashflows,
  };
};
