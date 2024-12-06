import { useCallback } from 'react';
import { useLazySettlementCashflowsQueryQuery } from 'src/graphql-schemas/documents/ratan-settlement-query.generated';
import type { RatanDashboardPanelSchema } from '../types/dashboard-types';
import { aggregationResult, transformResult } from '../utils/aggregation';

export const useQueryRouter = () => {
  const [execSettlementCashflowsQuery] = useLazySettlementCashflowsQueryQuery();
  const execQuery = useCallback(
    async (schema: RatanDashboardPanelSchema) => {
      const result: any[] = [];
      for (const queryItem of schema.query.queries) {
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
    [execSettlementCashflowsQuery],
  );

  return {
    execQuery,
  };
};
