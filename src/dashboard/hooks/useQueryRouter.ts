import { useCallback } from 'react';
import {
  useLazySettlementCashflowsQueryQuery,
  useLazySettlementGroupBlotterQueryQuery,
} from 'src/graphql-schemas/documents/ratan-settlement-query.generated';
import type { RatanDashboardPanelSchema } from '../types/dashboard-types';
import { aggregationResult, transformResult } from '../utils/aggregation';
import {
  cashflowQueryPayloadTransform,
  groupBlotterQueryPayloadTransform,
} from '../utils/transform-payload';

export const useQueryRouter = () => {
  const [execSettlementCashflowsQuery] = useLazySettlementCashflowsQueryQuery();
  const [execSettlementGroupBlotterQuery] =
    useLazySettlementGroupBlotterQueryQuery();

  const execQuery = useCallback(
    async (schema: RatanDashboardPanelSchema) => {
      const result: any[] = [];
      for (const queryItem of schema.query.queries) {
        let response = null;
        switch (queryItem.queryApi.endpoint) {
          case 'SettlementCashflowsQuery':
            response = await execSettlementCashflowsQuery(
              cashflowQueryPayloadTransform(queryItem.queryApi.payload),
            ).unwrap();
            break;
          case 'SettlementGroupBlotterQuery':
            response = await execSettlementGroupBlotterQuery(
              groupBlotterQueryPayloadTransform(queryItem.queryApi.payload),
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
    [execSettlementCashflowsQuery, execSettlementGroupBlotterQuery],
  );

  return {
    execQuery,
  };
};
