import dayjs from 'dayjs';
import { DATE_FORMAT } from '../../RatanOne/config/const';
import {
  CURRENT_DATE,
  currentDateName,
  currentDateSymbol,
  datePickerPresets,
  generateDatePickerFormat,
  generateDatePickerPresets,
  isVariable,
  isVariableHandlingEnabled,
  parseDate,
  submitDate,
} from './DateVariable';

describe('DateVariable', () => {
  it('generateDatePickerFormat - normal date', () => {
    const formatter = generateDatePickerFormat(DATE_FORMAT);
    const date = formatter('2024-01-01', dayjs('2024-01-01'), {
      type: 'businessDay',
      value: 1,
    });
    expect(date).toBe('2024-01-01');
  });
  it('generateDatePickerFormat - date variable', () => {
    const formatter = generateDatePickerFormat(DATE_FORMAT);
    const date = formatter(
      '$CURRENT_DATE',
      currentDateSymbol('$CURRENT_DATE', 0),
      { type: 'businessDay', value: 1 },
    );
    expect(date).toBe(currentDateName);
  });
  it('generateDatePickerPresets', () => {
    const set = jest.fn();
    const presets = generateDatePickerPresets(
      'date',
      '=',
      { type: 'businessDay', value: 1 },
      set,
    );
    expect(presets?.length).toEqual(4);
  });
  it('submitDate', () => {
    const date = submitDate(currentDateSymbol('$CURRENT_DATE', 0), {
      type: 'businessDay',
      value: 1,
    });
    expect(date).toBe(CURRENT_DATE);
  });
  it('parseDate', () => {
    const date = parseDate(CURRENT_DATE);
    expect(date.toString().split('T')[0]).toBe(
      currentDateSymbol('$CURRENT_DATE', 0).toString().split('T')[0],
    );

    const date2 = parseDate(dayjs().format());
    expect(date2).not.toBe(currentDateSymbol('$CURRENT_DATE', 0));
  });
  it('isVariable', () => {
    const res = isVariable(CURRENT_DATE);
    expect(res).toBe(true);
  });
  it('isVariableHandlingEnabled', () => {
    const res = isVariableHandlingEnabled('date', '=');
    expect(res).toBe(true);

    const res2 = isVariableHandlingEnabled('number', '=');
    expect(res2).toBe(false);
  });
});
