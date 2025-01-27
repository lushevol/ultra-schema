import dayjs from 'dayjs';
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

/**
 * transform jexl expression to normal value, e.g. convert $CURRENT_DATE to current date
 * @param val jexl expression
 * @returns normal value
 */
export const transformValue = (val: string): string => {
  if (!val.includes('$')) return val;
  const today = dayjs().format(DATE_FORMAT);
  return jexl.evalSync(val, { $CURRENT_DATE: today });
};
