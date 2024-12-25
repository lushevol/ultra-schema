import type {
  OpenSearchQuery,
  OpenSearchResult,
} from '../blotter-query/types/open-search-query';
import { baseApi as api } from './baseApi';
import type { ResultNew } from './types.generated';
const injectedRtkApi = api.injectEndpoints({
  endpoints: (build) => ({
    queryCashflowBlotter: build.query<
      OpenSearchResult<ResultNew>,
      OpenSearchQuery
    >({
      query: (queryArg) => ({
        url: '/opensearch/v1/call-sdk-internal/by-queryParameterSchema',
        method: 'POST',
        body: queryArg,
      }),
    }),
  }),
  overrideExisting: false,
});
export { injectedRtkApi as openSearchApi };

export const { useLazyQueryCashflowBlotterQuery } = injectedRtkApi;
