import type {
  OpenSearchQuery,
  OpenSearchResult,
} from '../blotter-query/types/open-search-query';
import { baseApi as api } from './baseApi';
import type { SettlementSchemaRootType } from './types.generated';
const injectedRtkApi = api.injectEndpoints({
  endpoints: (build) => ({
    queryCashflowBlotter: build.query<
      OpenSearchResult<SettlementSchemaRootType>,
      OpenSearchQuery
    >({
      query: (queryArg) => ({ url: '/xxx', method: 'POST', body: queryArg }),
    }),
  }),
  overrideExisting: false,
});
export { injectedRtkApi as openSearchApi };

export const { useLazyQueryCashflowBlotterQuery } = injectedRtkApi;
