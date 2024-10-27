import type {
  OpenSearchQuery,
  OpenSearchResult,
} from '../blotter-query/types/open-search-query';
import { baseApi as api } from './baseApi';
const injectedRtkApi = api.injectEndpoints({
  endpoints: (build) => ({
    queryBlotter: build.query<OpenSearchResult, OpenSearchQuery>({
      query: (queryArg) => ({ url: '/xxx', params: queryArg }),
    }),
  }),
  overrideExisting: false,
});
export { injectedRtkApi as openSearchApi };

export const { useQueryBlotterQuery } = injectedRtkApi;
