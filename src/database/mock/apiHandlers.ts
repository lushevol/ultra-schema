import { http, HttpResponse } from 'msw';
import type {
  ResponseESListData,
  ResponseListData,
} from 'src/dashboard/types/query-and-respond-types';
import type { OpenSearchResult } from '../../blotter-query/types/open-search-query';
import type { SettlementSchemaRootType } from '../../rtk-query/types.generated';
import Cashflows from '../cashflow';

export const apiHandlers = [
  // Intercept "GET https://example.com/user" requests...
  http.post('/opensearch', () => {
    // ...and respond to them using this JSON response.
    return HttpResponse.json<OpenSearchResult<SettlementSchemaRootType>>({
      totalResult: Cashflows.length,
      pageIndex: 1,
      itemsPerPage: Cashflows.length,
      pagingCursors: null,
      results: Cashflows,
    });
  }),
  http.post('/dashboard/query/pg/rcsh/list', () => {
    // ...and respond to them using this JSON response.
    return HttpResponse.json<ResponseListData>([
      {
        id: '1',
        name: 'Cashflow 1',
      },
    ]);
  }),
  http.post('/dashboard/query/es', () => {
    // ...and respond to them using this JSON response.
    return HttpResponse.json<ResponseESListData>({
      columns: [
        { name: 'id', type: 'string' },
        { name: 'name', type: 'string' },
      ],
      rows: [['1', 'Cashflow 1']],
    });
  }),
];
