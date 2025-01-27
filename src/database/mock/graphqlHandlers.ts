import { graphql } from 'msw';
import { HttpResponse } from 'msw';
import Cashflows from '../cashflow';

export const graphqlHandlers = [
  graphql.query('SettlementCashflowBlotterQuery', ({ query, variables }) => {
    return HttpResponse.json({
      data: {
        cashflowsNew: {
          results: Cashflows,
          pageInfo: {
            totalHits: Cashflows.length,
            pageNo: 0,
            pageSize: 1000,
            lastPage: true,
          },
        },
      },
    });
  }),
  graphql.query(
    'SettlementCashflowBlotterCountQuery',
    ({ query, variables }) => {
      return HttpResponse.json({
        data: {
          cashflowsNew: {
            pageInfo: {
              totalHits: Cashflows.length,
              pageNo: 0,
              pageSize: 1000,
              lastPage: true,
            },
          },
        },
      });
    },
  ),
  graphql.query('SettlementGroupBlotterQuery', ({ query, variables }) => {
    return HttpResponse.json({
      data: {
        groupMessages: {
          results: [],
          pageInfo: {
            totalHits: 0,
            pageNo: 0,
            pageSize: 1000,
            lastPage: true,
          },
        },
      },
    });
  }),
  graphql.query('SettlementGroupBlotterCountQuery', ({ query, variables }) => {
    return HttpResponse.json({
      data: {
        groupMessages: {
          pageInfo: {
            totalHits: 0,
            pageNo: 0,
            pageSize: 1000,
            lastPage: true,
          },
        },
      },
    });
  }),
  graphql.query(
    'SettlementExceptionCodeStatisticsQuery',
    ({ query, variables }) => {
      return HttpResponse.json({
        data: {
          exceptionCodeStatisticsByFilter: [
            {
              exceptionCode: 'code1',
              count: 1,
            },
            {
              exceptionCode: 'code2',
              count: 2,
            },
          ],
        },
      });
    },
  ),
];
