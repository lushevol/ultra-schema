import { graphql } from 'msw';
import { HttpResponse } from 'msw';
import Cashflows from '../cashflow';

export const graphqlHandlers = [
  graphql.query('SettlementCashflowsQuery', ({ query, variables }) => {
    return HttpResponse.json({
      data: {
        results: Cashflows,
        pageInfo: {
          totalHits: Cashflows.length,
          pageNo: 0,
          pageSize: 1000,
          lastPage: true,
        },
      },
    });
  }),
];
