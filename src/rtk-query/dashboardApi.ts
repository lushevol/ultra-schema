import type {
  DashboardPanelQuery,
  ResponseESListData,
  ResponseListData,
} from 'src/dashboard/types/query-and-respond-types';
import { baseApi as api } from './baseApi';

const injectedRtkApi = api.injectEndpoints({
  endpoints: (build) => ({
    queryPG: build.query<ResponseListData, DashboardPanelQuery>({
      query: (queryArg) => ({
        url: '/dashboard/query/pg/real_time',
        method: 'POST',
        body: queryArg,
      }),
    }),
    queryPGDailyDump: build.query<ResponseListData, DashboardPanelQuery>({
      query: (queryArg) => ({
        url: '/dashboard/query/pg/daily_dump',
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

export const {
  useLazyQueryPGQuery,
  useLazyQueryESQuery,
  useLazyQueryPGDailyDumpQuery,
} = injectedRtkApi;
