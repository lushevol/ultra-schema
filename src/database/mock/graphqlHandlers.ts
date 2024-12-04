import { graphql } from 'msw';
import { HttpResponse } from 'msw';

export const graphqlHandlers = [
  graphql.query('SettlementCashflowsQuery', ({ query, variables }) => {
    console.log(query, variables);
    return HttpResponse.json({
      data: {
        results: [],
        pageInfo: {
          totalHits: 100,
          pageNo: 1,
          pageSize: 10,
          lastPage: true,
        },
      },
    });
  }),
];
