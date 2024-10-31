import { http, HttpResponse } from 'msw';
import type { OpenSearchResult } from '../../blotter-query/types/open-search-query';
import type { SettlementSchemaRootType } from '../../rtk-query/types.generated';
import Cashflows from '../cashflow';

export const apiHandlers = [
  // Intercept "GET https://example.com/user" requests...
  http.post('/xxx', () => {
    // ...and respond to them using this JSON response.
    return HttpResponse.json<OpenSearchResult<SettlementSchemaRootType>>({
      totalResult: Cashflows.length,
      pageIndex: 1,
      itemsPerPage: Cashflows.length,
      pagingCursors: null,
      results: Cashflows,
    });
  }),
];
