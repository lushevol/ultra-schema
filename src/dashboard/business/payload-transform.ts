import { type FilterArg, Operator } from 'src/rtk-query/types.generated';
import type { RatanDashboardFilter } from '../types/dashboard-types';
import { transformValue } from '../utils/transform-payload';
import type {
  CashflowBlotterGraphQLPayloadType,
  GroupBlotterGraphQLPayloadType,
} from './business-types';

export const cashflowBlotterQueryPayloadTransform = (
  payload: CashflowBlotterGraphQLPayloadType,
  globalFilters: Array<RatanDashboardFilter['filter']>,
): typeof payload => {
  const payloadCopy = JSON.parse(JSON.stringify(payload));
  const globalFiltersCopy = JSON.parse(JSON.stringify(globalFilters));
  if (Array.isArray(payloadCopy.filter)) {
    payloadCopy.filter = [
      ...(payloadCopy.filter as FilterArg[]),
      ...globalFiltersCopy,
    ].map((f) => {
      if (Array.isArray(f.values)) {
        f.values = f.values.map((i: string) => transformValue(i));
      } else if (typeof f.values === 'string') {
        f.values = transformValue(f.values);
      }

      return f;
    });
  } else {
    if (Array.isArray(payloadCopy.filter?.values)) {
      payloadCopy.filter.values = payloadCopy.filter.values.map((i: string) =>
        transformValue(i),
      );
    } else if (typeof payloadCopy.filter?.values === 'string') {
      payloadCopy.filter.values = transformValue(payloadCopy.filter.values);
    }
  }

  return payloadCopy;
};

export const groupBlotterQueryPayloadTransform = (
  payload: GroupBlotterGraphQLPayloadType,
  globalFilters: Array<RatanDashboardFilter['filter']>,
): typeof payload => {
  const payloadCopy = JSON.parse(JSON.stringify(payload));
  if (payloadCopy.filter?.Value_Date) {
    payloadCopy.filter.Value_Date = transformValue(
      payloadCopy.filter.Value_Date,
    );
  }

  globalFilters.forEach(({ field, operator, values }) => {
    if ([Operator.Eq, Operator.In].includes(operator)) {
      payloadCopy.filter[field] = values;
    }
  });

  return payloadCopy;
};
