import dayjs from 'dayjs';
import { DATE_FORMAT } from './transform-payload';

/**
 * Return the date string by the workday offset from today
 * @param offset - The offset of the workday
 * @returns The date string
 * @description offset = 0: today, offset > 0: future workday, offset < 0: past workday
 * @example today is Friday, getDateByWorkdayOffset(1) => next Monday
 * @example today is Tuesday, getDateByWorkdayOffset(-2) => last Friday
 */
export const getDateByWorkdayOffset = (offset: number, crtDate?: string) => {
  let currentDate = dayjs(crtDate).startOf('day');
  let remainingOffset = Math.abs(offset);
  while (remainingOffset > 0) {
    currentDate = currentDate.add(offset > 0 ? 1 : -1, 'day');
    // skip weekends
    if (![0, 6].includes(currentDate.day())) {
      remainingOffset--;
    }
  }
  return currentDate.format(DATE_FORMAT);
};
