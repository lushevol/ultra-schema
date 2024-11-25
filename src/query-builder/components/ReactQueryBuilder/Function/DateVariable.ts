import dayjs, { type Dayjs } from 'dayjs';
import utc from 'dayjs/plugin/utc';
import { getEnable } from '../../../../ratanutils/componentEnabling';
import { CustomDatePickerSelect } from '../ControlElements/CustomDatePickerSelect';
dayjs.extend(utc);

export const CURRENT_DATE = '$CURRENT_DATE';
export const LAST_BUSINESS_DATE = 'businessDay(-1)';
export const NEXT_BUSINESS_DATE = 'businessDay(1)';
export const CUSTOM_DATE = 'businessDay/calendarDay';
export const currentDateName = 'Current Date';
export const lastBusinessDateName = 'Last Business Day';
export const nextBusinessDateName = 'Next Business Day';
export const customDateName = 'Custom Day';
const isCustomHightDate = /businessDay[(].*[)]|calendarDay[(].*[)]/g;

export const currentDateSymbol = (custom: string, day: number) => {
  const d = dayjs(new Date().getTime() + day * 86400000);
  // @ts-ignore
  d.$custom = custom;
  return d;
};
export const datePickerPresets = (
  customDay?: { type: string; value: number },
  set?: Function,
): {
  label: React.ReactNode;
  value: Dayjs;
}[] =>
  [
    { label: currentDateName, value: currentDateSymbol(CURRENT_DATE, 0) },
    getEnable('Support_Custom_Day') && {
      label: lastBusinessDateName,
      value: currentDateSymbol(LAST_BUSINESS_DATE, -1),
    },
    getEnable('Support_Custom_Day') && {
      label: nextBusinessDateName,
      value: currentDateSymbol(NEXT_BUSINESS_DATE, 1),
    },
    getEnable('Support_Custom_Day') && {
      label: set ? CustomDatePickerSelect(customDay, set) : customDateName,
      value: currentDateSymbol(CUSTOM_DATE, 2 + (customDay?.value ?? 0)),
    },
  ].filter(Boolean);

const getCurrentDateSymbol = (
  d: Dayjs | null,
  customDate: { type: string; value: number },
): { label: string; value: Dayjs } => {
  const a = datePickerPresets().find(
    // @ts-ignore
    (item) => d?.$custom && item.value.$custom === d.$custom,
  );

  // @ts-ignore
  if (d?.$custom === CUSTOM_DATE) {
    const value = currentDateSymbol(
      // @ts-ignore
      `${customDate.type}(${customDate.value})`,
      // @ts-ignore
      customDate.value * 200,
    );
    return {
      label: customDateName,
      value,
    };
    // @ts-ignore
  }
  if (!a && d && isCustomHightDate.test(d.$custom)) {
    return {
      label: customDateName,
      // @ts-ignore
      value: d.$D ? d : currentDateSymbol(d.$custom, 2),
    };
  }

  return a as { label: string; value: Dayjs };
};

export const generateDatePickerFormat =
  (f?: string) =>
  (
    realValue: string,
    value: Dayjs,
    customDate: { type: string; value: number },
  ): string => {
    const label = getCurrentDateSymbol(value, customDate)?.label;
    if (!label && dayjs(realValue).isValid()) {
      return value.format(f);
    }
    return label || customDateName;
  };

export const generateDatePickerPresets = (
  fieldType: string,
  operator: string,
  customDate: { type: string; value: number },
  set: Function,
) => {
  return isVariableHandlingEnabled(fieldType, operator)
    ? datePickerPresets(customDate, set)
    : undefined;
};

export const submitDate = (
  d: Dayjs | null,
  customDate: { type: string; value: number },
  f?: string,
) =>
  // @ts-ignore
  (getCurrentDateSymbol(d, customDate)?.value?.$custom || d?.format(f)) ?? '';

export const parseDate = (value: string) => {
  // @ts-ignore
  const a = getCurrentDateSymbol({ $custom: value });
  if (a) {
    return a.value;
  }

  return dayjs.utc(value);
};

export const isVariable = (v: string) => {
  // @ts-ignore
  return !!getCurrentDateSymbol({ $custom: v });
};

export const isVariableHandlingEnabled = (
  fieldType: string,
  operator: string,
) => {
  return (
    ['=', '!=', '>', '>=', '<', '<='].includes(operator) &&
    ['date', 'datetime', 'time'].includes(fieldType)
  );
};
