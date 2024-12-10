import dayjs from 'dayjs';
import { cloneDeep } from 'lodash';
import type { FilterArg, GroupMsgReq } from 'src/rtk-query/types.generated';
import { jexl } from './aggregation';

const DATE_FORMAT = 'YYYY-MM-DD';

jexl.addBinaryOp('++', 20, (left, right) => {
  return dayjs(left)
    .add(right as number, 'day')
    .format(DATE_FORMAT);
});

jexl.addBinaryOp('--', 20, (left, right) => {
  return dayjs(left)
    .subtract(right as number, 'day')
    .format(DATE_FORMAT);
});

const transformValue = (val: string) => {
  if (!val.includes('$')) return val;
  const today = dayjs().format(DATE_FORMAT);
  return jexl.evalSync(val, { $CURRENT_DATE: today });
};

export const cashflowQueryPayloadTransform = (payload: {
  filter?: FilterArg[] | FilterArg;
  page: number;
  size: number;
}): typeof payload => {
  const payloadCopy = JSON.parse(JSON.stringify(payload));
  if (Array.isArray(payloadCopy.filter)) {
    (payloadCopy.filter as FilterArg[]).forEach((f) => {
      if (Array.isArray(f.values)) {
        f.values = f.values.map((i) => transformValue(i));
      } else if (typeof f.values === 'string') {
        f.values = transformValue(f.values);
      }
    });
  } else {
    if (Array.isArray(payloadCopy.filter?.values)) {
      payloadCopy.filter.values = payloadCopy.filter.values.map((i) =>
        transformValue(i),
      );
    } else if (typeof payloadCopy.filter?.values === 'string') {
      payloadCopy.filter.values = transformValue(payloadCopy.filter.values);
    }
  }

  return payloadCopy;
};

export const groupBlotterQueryPayloadTransform = (payload: {
  filter?: GroupMsgReq;
  page: number;
  size: number;
}): typeof payload => {
  const payloadCopy = JSON.parse(JSON.stringify(payload));
  if (payloadCopy.filter?.Value_Date) {
    payloadCopy.filter.Value_Date = transformValue(
      payloadCopy.filter.Value_Date,
    );
  }

  return payloadCopy;
};
