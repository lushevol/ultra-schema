import type {
  DashboardPanelQuery,
  ResponseCountData,
  ResponseESListData,
  ResponseListData,
  ResponseObjectData,
} from 'src/dashboard/types/query-and-respond-types';
import { baseApi as api } from './baseApi';

const injectedRtkApi = api.injectEndpoints({
  endpoints: (build) => ({
    queryPG: build.query<
      ResponseListData | ResponseObjectData | ResponseCountData,
      DashboardPanelQuery
    >({
      query: (queryArg) => ({
        url: '/dashboard/query/pg/rcsh/list',
        method: 'POST',
        body: queryArg,
      }),
    }),
    queryES: build.query<ResponseESListData, DashboardPanelQuery>({
      query: (arg) => ({
        headers: {
          'Kbn-Xsrf': 'kibana',
        },
        url: '/dashboard/query/es',
        method: 'POST',
        body: {
          query: arg.query,
        },
      }),
    }),
  }),
  overrideExisting: false,
});
export { injectedRtkApi as dashboardApi };

export const { useLazyQueryPGQuery, useLazyQueryESQuery } = injectedRtkApi;