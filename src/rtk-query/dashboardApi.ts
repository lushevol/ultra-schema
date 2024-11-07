import type {
  DashboardPanelQuery,
  DashboardPanelResponse,
} from 'src/dashboard/types/query-and-respond-types';
import { baseApi as api } from './baseApi';

const injectedRtkApi = api.injectEndpoints({
  endpoints: (build) => ({
    queryPanel: build.query<DashboardPanelResponse, DashboardPanelQuery>({
      query: (queryArg) => ({
        url: '/api/ratan/dashboard/query/rcsh',
        method: 'POST',
        body: queryArg,
      }),
    }),
  }),
  overrideExisting: false,
});
export { injectedRtkApi as dashboardApi };

export const { useLazyQueryPanelQuery } = injectedRtkApi;
