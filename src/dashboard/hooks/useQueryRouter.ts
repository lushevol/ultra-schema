import { useCallback } from 'react';
import { useLazySettlementCashflowsQueryQuery } from 'src/graphql-schemas/documents/ratan-settlement-query.generated';
import type { RatanDashboardQueryType } from '../types/dashboard-types';
import { aggregationResult, transformResult } from '../utils/aggregation';

export const useQueryRouter = () => {
  const [execSettlementCashflowsQuery] = useLazySettlementCashflowsQueryQuery();
  const execQuery = useCallback(
    async (query: RatanDashboardQueryType) => {
      const result: any[] = [];
      for (const queryItem of query.queries) {
        let response = null;
        switch (queryItem.queryApi.endpoint) {
          case 'SettlementCashflowsQuery':
            response = await execSettlementCashflowsQuery({
              page: 0,
              size: 1,
              ...queryItem.queryApi.payload,
            }).unwrap();
            break;
          default:
            break;
        }
        result.push(
          await transformResult({
            response: response,
            resultTransform: queryItem.resultTransform,
            previousResults: result,
          }),
        );
      }

      return await aggregationResult({
        result,
        aggregation: query.aggregation,
      });
    },
    [execSettlementCashflowsQuery],
  );

  return {
    execQuery,
  };
};
