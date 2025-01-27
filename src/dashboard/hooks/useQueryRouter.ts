import { filter } from 'lodash';
import { useCallback } from 'react';
import {
  useLazyRate2usdQuery,
  useLazySettlementCashflowBlotterCountQueryQuery,
  useLazySettlementCashflowBlotterQueryQuery,
  useLazySettlementExceptionCodeStatisticsQueryQuery,
  useLazySettlementGroupBlotterCountQueryQuery,
  useLazySettlementGroupBlotterQueryQuery,
} from 'src/graphql-schemas/documents/ratan-settlement-query.generated';
import type { FilterArg } from 'src/rtk-query/types.generated';
import type {
  CashflowBlotterGraphQLPayloadType,
  GroupBlotterGraphQLPayloadType,
} from '../business/business-types';
import {
  cashflowBlotterQueryPayloadTransform,
  groupBlotterQueryPayloadTransform,
} from '../business/payload-transform';
import type {
  FilterBusinessDomain,
  RatanDashboardFilter,
  RatanDashboardPanelSchema,
  RatanDashboardSchema,
} from '../types/dashboard-types';
import { aggregationResult, transformResult } from '../utils/aggregation';

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
  const [execRate2USDQuery] = useLazyRate2usdQuery();

  const execQuery = useCallback(
    async (
      schema: RatanDashboardPanelSchema,
      globalFilters: RatanDashboardSchema['globalFilters'],
    ) => {
      const result: unknown[] = [];
      for (const queryItem of schema.query.queries) {
        let response = null;
        switch (queryItem.queryApi.endpoint) {
          case 'SettlementCashflowBlotterQuery':
            response = await execSettlementCashflowBlotterQuery(
              cashflowBlotterQueryPayloadTransform(
                queryItem.queryApi.payload as CashflowBlotterGraphQLPayloadType,
                filterGlobalFilters(globalFilters, 'SettlementCashflowBlotter'),
              ),
            ).unwrap();
            break;
          case 'SettlementCashflowBlotterCountQuery':
            response = await execSettlementCashflowBlotterCountQuery(
              cashflowBlotterQueryPayloadTransform(
                queryItem.queryApi.payload as CashflowBlotterGraphQLPayloadType,
                filterGlobalFilters(globalFilters, 'SettlementCashflowBlotter'),
              ),
            ).unwrap();
            break;
          case 'SettlementGroupBlotterQuery':
            response = await execSettlementGroupBlotterQuery(
              groupBlotterQueryPayloadTransform(
                queryItem.queryApi.payload as GroupBlotterGraphQLPayloadType,
                filterGlobalFilters(globalFilters, 'SettlementGroupBlotter'),
              ),
            ).unwrap();
            break;
          case 'SettlementGroupBlotterCountQuery':
            response = await execSettlementGroupBlotterCountQuery(
              groupBlotterQueryPayloadTransform(
                queryItem.queryApi.payload as GroupBlotterGraphQLPayloadType,
                filterGlobalFilters(globalFilters, 'SettlementGroupBlotter'),
              ),
            ).unwrap();
            break;
          case 'SettlementExceptionCodeStatisticsQuery':
            response = await execSettlementExceptionCodeStatisticsQuery(
              queryItem.queryApi.payload as {
                filter: FilterArg[];
              },
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
        resultTransform: schema.query.resultTransform,
        schema,
      });
    },
    [
      execSettlementCashflowBlotterQuery,
      execSettlementGroupBlotterQuery,
      execSettlementCashflowBlotterCountQuery,
      execSettlementGroupBlotterCountQuery,
      execSettlementExceptionCodeStatisticsQuery,
    ],
  );

  return {
    execQuery,
  };
};

const filterGlobalFilters = (
  globalFilters: RatanDashboardFilter[],
  domain: FilterBusinessDomain,
): FilterArg[] => {
  return globalFilters
    .filter((filter) => filter.domain.includes(domain))
    .map((filter) => filter.filter);
};
