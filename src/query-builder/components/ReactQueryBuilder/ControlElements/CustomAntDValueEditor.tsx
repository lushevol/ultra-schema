import { AutoComplete, Checkbox, DatePicker, Input, Radio, Switch } from 'antd';
import dayjs, { type Dayjs } from 'dayjs';
import timezone from 'dayjs/plugin/timezone';
import utc from 'dayjs/plugin/utc';
import cloneDeep from 'lodash/cloneDeep';
import type { ComponentType } from 'react';
import {
  type ValueEditorProps,
  type ValueSelectorProps,
  getFirstOption,
  joinWith,
  standardClassnames,
  useValueEditor,
} from 'react-querybuilder';
import {
  DATE_FORMAT,
  DATE_TIME_FORMAT,
  TIME_FORMAT,
} from '../../RatanOne/config/const';
import type { RuleFunctionConfig } from '../../RatanOne/type';
import { generateNewType } from '../CustomFunction/utils/utils';
import type { CustomDateTimeFormat, ValueEditorSuperType } from '../types';
import { datetimeFormatChecker, handelValue } from '../utils';
import { CustomAntDValueSelector } from './CustomAntDValueSelector';
import { CustomDatePacker } from './CustomDatePacker';
import { MultipleDatePicker } from './MultipleDatePicker';
import { MultipleInputNumber } from './MultipleInputNumber';
import { RegExpInput } from './RegExpInput';

dayjs.extend(utc);
dayjs.extend(timezone);
dayjs.tz.setDefault('Europe/London');

type CustomAntDValueEditorProps = Omit<
  ValueEditorProps,
  'type' | 'selectorComponent' | 'schema' | 'valueSource'
> & {
  type?: ValueEditorSuperType;
  selectorComponent?: ComponentType<
    Omit<ValueSelectorProps, 'schema'> & {
      allowClear?: boolean;
      schema?: any;
      widgetType?: 'select' | 'multiselect' | 'multiselectWithoutOptions';
    }
  >;
  schema?: any;
  valueSource?: any;
  enableFn?: boolean;
  functionConfig?: RuleFunctionConfig[];
} & CustomDateTimeFormat;

export const handelDateValue = (dates, format, listsAsArrays) => {
  const dateArray = dates?.map((d) =>
    d?.isValid() ? d.format(format) : undefined,
  );
  if (dateArray) {
    return listsAsArrays ? dateArray : joinWith(dateArray, ',');
  }
  return dates;
};
const dateTimeConfig = ({
  operator,
  value,
  valueAsArray,
  datePickerVariable,
  inputTypeCoerced,
  className,
  disabled,
  placeHolderText,
  format,
  listsAsArrays,
  handleOnChange,
}) => {
  if (['between', 'notBetween'].includes(operator)) {
    const dayjsArray = valueAsArray.slice(0, 2).map((i) => dayjs.utc(i)) as [
      Dayjs,
      Dayjs,
    ];
    return (
      <DatePicker.RangePicker
        value={dayjsArray.every((d) => d.isValid()) ? dayjsArray : undefined}
        showTime={['datetime-local', 'datetime'].includes(inputTypeCoerced)}
        className={className}
        disabled={disabled}
        placeholder={[placeHolderText, placeHolderText]}
        onChange={
          /* istanbul ignore next */
          (dates) => {
            handleOnChange(handelDateValue(dates, format, listsAsArrays));
          }
        }
        allowClear
        data-testid={'datePicker-rangePicker'}
      />
    );
  }

  if (inputTypeCoerced === 'date') {
    return (
      <CustomDatePacker
        className={className}
        value={value}
        disabled={disabled}
        placeHolderText={placeHolderText}
        datePickerVariable={datePickerVariable}
        inputTypeCoerced={inputTypeCoerced}
        operator={operator}
        staticFormat={format}
        handleOnChange={handleOnChange}
      />
    );
  }
  return (
    <DatePicker
      value={handelValue(dayjs(value, format))}
      showTime={true}
      className={className}
      disabled={disabled}
      placeholder={placeHolderText}
      onChange={(d) => handleOnChange(d?.format(format) ?? '')}
      format={format}
      allowClear
      data-testid={'datetime-local'}
    />
  );
};

export const CustomAntDValueEditor = ({
  fieldData,
  operator,
  value,
  handleOnChange,
  title,
  className,
  type,
  inputType,
  values = [],
  listsAsArrays,
  parseNumbers,
  separator,
  valueSource: _vs,
  disabled,
  testID,
  selectorComponent: SelectorComponent = CustomAntDValueSelector,
  dateFormat = DATE_FORMAT,
  timeFormat = TIME_FORMAT,
  datetimeFormat = DATE_TIME_FORMAT,
  treatDateTimeAsDate,
  datePickerVariable,
  schema,
  field,
  enableFn = false,
  rule,
  functionConfig = [] as RuleFunctionConfig[],
  ...props
}: CustomAntDValueEditorProps) => {
  const newInputType = enableFn
    ? generateNewType(rule, field, props, schema, inputType, functionConfig)
    : inputType;

  const { valueAsArray, multiValueHandler } = useValueEditor({
    handleOnChange,
    inputType: newInputType,
    operator,
    value,
    listsAsArrays,
    parseNumbers,
    values,
  });

  if (['null', 'notNull', 'empty', 'notEmpty'].includes(operator)) {
    return null;
  }

  const placeHolderText = fieldData?.placeholder ?? '';

  let specificInputType = newInputType;
  if (
    treatDateTimeAsDate &&
    ['datetime', 'datetime-local', 'time'].includes(newInputType!)
  ) {
    specificInputType = 'date';
  }
  const inputTypeCoerced = ['in', 'notIn'].includes(operator)
    ? 'text'
    : specificInputType;

  if (
    ['between', 'notBetween'].includes(operator) &&
    ['select', 'text'].includes(type!) &&
    // Date ranges are handled differently in AntD--see below
    !['date', 'datetime', 'datetime-local'].includes(inputTypeCoerced)
  ) {
    const editors = ['from', 'to'].map((key, i) => {
      if (type === 'text') {
        if (inputTypeCoerced === 'time') {
          return (
            <DatePicker.TimePicker
              key={key}
              value={
                valueAsArray[i] ? dayjs(valueAsArray[i], timeFormat) : null
              }
              className={standardClassnames.valueListItem}
              disabled={disabled}
              placeholder={placeHolderText}
              onChange={(d) =>
                multiValueHandler(d?.format(timeFormat) ?? '', i)
              }
              data-testid={'time-picker'}
            />
          );
        }
        return (
          <Input
            key={key}
            type={inputTypeCoerced}
            value={valueAsArray[i] ?? ''}
            className={standardClassnames.valueListItem}
            disabled={disabled}
            placeholder={placeHolderText}
            onChange={(e) => {
              let v = e.target.value;
              if (inputTypeCoerced === 'number' && !parseNumbers) v = `${v}`;
              return multiValueHandler(v, i);
            }}
            data-testid={'text-input'}
          />
        );
      }
      return (
        <SelectorComponent
          {...props}
          key={key}
          className={standardClassnames.valueListItem}
          handleOnChange={(v) => multiValueHandler(v, i)}
          disabled={disabled}
          value={valueAsArray[i] ?? getFirstOption(values)}
          options={values}
          listsAsArrays={listsAsArrays}
        />
      );
    });
    return (
      <span data-testid={testID} className={className} title={title}>
        {editors[0]}
        {separator}
        {editors[1]}
      </span>
    );
  }

  switch (type) {
    case 'select':
    case 'multiselect':
    case 'multiselectWithoutOptions':
      return (
        <SelectorComponent
          {...props}
          className={className}
          handleOnChange={handleOnChange}
          options={values}
          value={value}
          title={title}
          disabled={disabled}
          multiple={['multiselect', 'multiselectWithoutOptions'].includes(type)}
          listsAsArrays={listsAsArrays}
          allowClear
          widgetType={type}
        />
      );

    case 'textarea':
      return (
        <Input.TextArea
          value={value}
          title={title}
          className={className}
          disabled={disabled}
          placeholder={placeHolderText}
          onChange={(e) => handleOnChange(e.target.value)}
          allowClear
          data-testid={'textarea-input'}
        />
      );

    case 'switch':
      return (
        <Switch
          checked={!!value}
          title={title}
          className={className}
          disabled={disabled}
          onChange={(v) => handleOnChange(v)}
          data-testid={'switch-type'}
        />
      );

    case 'checkbox':
      return (
        <span title={title} className={className}>
          <Checkbox
            type="checkbox"
            disabled={disabled}
            onChange={(e) => handleOnChange(e.target.checked)}
            checked={!!value}
            data-testid={'checkbox-type'}
          />
        </span>
      );

    case 'radio':
      return (
        <span className={className} title={title}>
          {values.map((v) => (
            <Radio
              key={v.name}
              value={v.name}
              checked={value === v.name}
              disabled={disabled}
              onChange={(e) => handleOnChange(e.target.value)}
              data-testid={'radio-type'}
            >
              {v.label}
            </Radio>
          ))}
        </span>
      );

    case 'multipleinputnumber':
      return (
        <MultipleInputNumber
          {...props}
          className={className}
          handleOnChange={handleOnChange}
          options={values}
          value={value}
          title={title}
          disabled={disabled}
          multiple
          listsAsArrays={listsAsArrays}
          parseNumbers={parseNumbers}
          allowClear
        />
      );

    case 'multipledatepicker':
      return (
        <MultipleDatePicker
          {...props}
          className={className}
          handleOnChange={handleOnChange}
          options={values}
          value={value}
          title={title}
          disabled={disabled}
          multiple
          listsAsArrays={listsAsArrays}
          type={newInputType ?? ''}
          dateFormat={dateFormat}
          timeFormat={timeFormat}
          datetimeFormat={datetimeFormat}
          allowClear
        />
      );

    case 'regExpInput':
      return (
        <RegExpInput
          value={value}
          title={title}
          className={className}
          disabled={disabled}
          placeholder={placeHolderText}
          onChange={handleOnChange}
          allowClear
        />
      );
  }

  switch (inputTypeCoerced) {
    case 'date':
    case 'datetime':
    case 'datetime-local': {
      const format = datetimeFormatChecker(inputTypeCoerced, {
        dateFormat,
        timeFormat,
        datetimeFormat,
      });
      return dateTimeConfig({
        operator,
        value,
        valueAsArray,
        datePickerVariable,
        inputTypeCoerced,
        className,
        disabled,
        placeHolderText,
        format,
        listsAsArrays,
        handleOnChange,
      });
    }

    case 'time': {
      const dateValue = dayjs(value, timeFormat);
      return (
        <DatePicker.TimePicker
          value={handelValue(dateValue)}
          className={className}
          disabled={disabled}
          placeholder={placeHolderText}
          onChange={(d) => handleOnChange(d?.format(timeFormat) ?? '')}
          format={timeFormat}
          allowClear
          data-testid={'datePicker-timePicker'}
        />
      );
    }
  }

  if (values.length && newInputType === 'text') {
    const valuesClone = cloneDeep(values);
    if (value)
      valuesClone.sort((option) =>
        option?.value.toUpperCase().indexOf(`${value}`.toUpperCase()) !== -1
          ? -1
          : 1,
      );
    return (
      <AutoComplete
        options={valuesClone}
        value={value}
        title={title}
        className={className}
        disabled={disabled}
        placeholder={placeHolderText}
        onChange={(v) => handleOnChange(v)}
        allowClear
        data-testid={'customAntDValueEditor-autoComplete'}
      />
    );
  }
  return (
    <Input
      type={inputTypeCoerced}
      value={value}
      title={title}
      className={className}
      disabled={disabled}
      placeholder={placeHolderText}
      onChange={(e) => handleOnChange(e.target.value)}
      allowClear
      data-testid={'customAntDValueEditor-Input'}
    />
  );
};

CustomAntDValueEditor.displayName = 'CustomAntDValueEditor';
