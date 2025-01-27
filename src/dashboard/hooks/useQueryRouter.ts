import { useCallback } from 'react';
import {
  useLazyRate2UsdQuery,
  useLazySettlementCashflowBlotterCountQueryQuery,
  useLazySettlementCashflowBlotterQueryQuery,
  useLazySettlementExceptionCodeStatisticsQueryQuery,
  useLazySettlementGroupBlotterCountQueryQuery,
  useLazySettlementGroupBlotterQueryQuery,
} from 'src/graphql-schemas/documents/ratan-settlement-query.generated';
import type {
  RatanDashboardPanelSchema,
  RatanDashboardSchema,
} from '../types/dashboard-types';
import { aggregationResult, transformResult } from '../utils/aggregation';
import {
  cashflowBlotterQueryPayloadTransform,
  groupBlotterQueryPayloadTransform,
} from '../utils/transform-payload';

export const useQueryRouter = () => {
  const [execSettlementCashflowBlotterQuery] =
    useLazySettlementCashflowBlotterQueryQuery();
  const [execSettlementCashflowBlotterCountQuery] =
    useLazySettlementCashflowBlotterCountQueryQuery();
  const [execSettlementGroupBlotterQuery] =
    useLazySettlementGroupBlotterQueryQuery();
  const [execSettlementGroupBlotterCountQuery] =
    useLazySettlementGroupBlotterCountQueryQuery();
  const [execSettlementExceptionCodeStatisticsQuery] =
    useLazySettlementExceptionCodeStatisticsQueryQuery();
  const [execRate2USDQuery] = useLazyRate2UsdQuery();

  const execQuery = useCallback(
    async (
      schema: RatanDashboardPanelSchema,
      globalFilters: RatanDashboardSchema['globalFilters'],
    ) => {
      const result: any[] = [];
      for (const queryItem of schema.query.queries) {
        let response = null;
        switch (queryItem.queryApi.endpoint) {
          case 'SettlementCashflowBlotterQuery':
            response = await execSettlementCashflowBlotterQuery(
              cashflowBlotterQueryPayloadTransform(
                queryItem.queryApi.payload,
                globalFilters
                  .filter((filter) =>
                    filter.domain.includes('SettlementCashflowBlotter'),
                  )
                  .map((filter) => filter.filter),
              ),
            ).unwrap();
            break;
          case 'SettlementCashflowBlotterCountQuery':
            response = await execSettlementCashflowBlotterCountQuery(
              cashflowBlotterQueryPayloadTransform(
                queryItem.queryApi.payload,
                globalFilters
                  .filter((filter) =>
                    filter.domain.includes('SettlementCashflowBlotter'),
                  )
                  .map((filter) => filter.filter),
              ),
            ).unwrap();
            break;
          case 'SettlementGroupBlotterQuery':
            response = await execSettlementGroupBlotterQuery(
              groupBlotterQueryPayloadTransform(
                queryItem.queryApi.payload,
                globalFilters
                  .filter((filter) =>
                    filter.domain.includes('SettlementGroupBlotter'),
                  )
                  .map((filter) => filter.filter),
              ),
            ).unwrap();
            break;
          case 'SettlementGroupBlotterCountQuery':
            response = await execSettlementGroupBlotterCountQuery(
              groupBlotterQueryPayloadTransform(
                queryItem.queryApi.payload,
                globalFilters
                  .filter((filter) =>
                    filter.domain.includes('SettlementGroupBlotter'),
                  )
                  .map((filter) => filter.filter),
              ),
            ).unwrap();
            break;
          default:
            break;
        }
        result.push(
          await transformResult({
            response: response,
            resultTransform: queryItem.resultTransform,
            previousResults: result,
            schema,
          }),
        );
      }

      return await aggregationResult({
        result,
        aggregation: schema.query.aggregation,
        schema,
      });
    },
    [
      execSettlementCashflowBlotterQuery,
      execSettlementGroupBlotterQuery,
      execSettlementCashflowBlotterCountQuery,
      execSettlementGroupBlotterCountQuery,
    ],
  );

  return {
    execQuery,
  };
};
