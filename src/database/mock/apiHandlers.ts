import { http, HttpResponse } from 'msw';
import type { WhoIsUsingResponse } from 'packages/ratan-track-using/src';
import type {
  ResponseESListData,
  ResponseListData,
} from 'src/dashboard/types/query-and-respond-types';
import type { OpenSearchResult } from '../../blotter-query/types/open-search-query';
import type { SettlementSchemaRootType } from '../../rtk-query/types.generated';
import Cashflows from '../cashflow';

export const apiHandlers = [
  http.post('/opensearch/v1/call-sdk-internal/by-queryParameterSchema', () => {
    return HttpResponse.json<OpenSearchResult<SettlementSchemaRootType>>({
      totalResult: Cashflows.length,
      pageIndex: 1,
      itemsPerPage: Cashflows.length,
      pagingCursors: null,
      results: Cashflows,
    });
  }),
  http.post('/dashboard/query/pg/real_time', () => {
    return HttpResponse.json<ResponseListData>([
      {
        id: '1',
        name: 'Cashflow 1',
      },
    ]);
  }),
  http.post('/dashboard/query/pg/daily_dump', () => {
    return HttpResponse.json<ResponseListData>([
      {
        id: '1',
        name: 'Cashflow 1',
      },
    ]);
  }),
  http.post('/dashboard/query/es', () => {
    return HttpResponse.json<ResponseESListData>({
      columns: [
        { name: 'id', type: 'string' },
        { name: 'name', type: 'string' },
      ],
      rows: [['1', 'Cashflow 1']],
    });
  }),
  http.post('/track-using/im-using', () => {
    return HttpResponse.json({});
  }),
  http.get('/track-using/who-is-using', () => {
    return HttpResponse.json<WhoIsUsingResponse>({
      users: [],
    });
  }),
];
