import dayjs from 'dayjs';
import {
  type FilterArg,
  type GroupMsgReq,
  Operator,
} from 'src/rtk-query/types.generated';
import type { RatanDashboardFilter } from '../types/dashboard-types';
import { jexl } from './aggregation';
import { getDateByWorkdayOffset } from './utils';

export const DATE_FORMAT = 'YYYY-MM-DD';

jexl.addBinaryOp('+d', 20, (left, right) => {
  return dayjs(left).add(Number(right), 'day').format(DATE_FORMAT);
});

jexl.addBinaryOp('-d', 20, (left, right) => {
  return dayjs(left).subtract(Number(right), 'day').format(DATE_FORMAT);
});

jexl.addBinaryOp('+wd', 20, (left, right) => {
  return getDateByWorkdayOffset(Number(right), left);
});

jexl.addBinaryOp('-wd', 20, (left, right) => {
  return getDateByWorkdayOffset(-Number(right), left);
});

// convert $CURRENT_DATE to current date
const transformValue = (val: string) => {
  if (!val.includes('$')) return val;
  const today = dayjs().format(DATE_FORMAT);
  return jexl.evalSync(val, { $CURRENT_DATE: today });
};

export const cashflowBlotterQueryPayloadTransform = (
  payload: {
    filter?: FilterArg[] | FilterArg;
    page: number;
    size: number;
  },
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
  payload: {
    filter?: GroupMsgReq;
    page: number;
    size: number;
  },
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
