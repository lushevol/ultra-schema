import { DatePicker } from 'antd';
import { useState } from 'react';
import { useMap } from 'react-use';
import {
  generateDatePickerFormat,
  generateDatePickerPresets,
  parseDate,
  submitDate,
} from '../Function';
import { handelValue } from '../utils';

export const CustomDatePacker = ({
  className,
  value,
  disabled,
  placeHolderText,
  datePickerVariable,
  inputTypeCoerced,
  operator,
  staticFormat,
  handleOnChange,
}: any) => {
  const [open, setOpen] = useState(false);
  const [customDate, { set }] = useMap({
    type: 'businessDay',
    value: 1,
  });

  const change = (d) => {
    setOpen(false);
    handleOnChange(submitDate(d, customDate, staticFormat));
  };

  return (
    <DatePicker
      open={open}
      presets={
        datePickerVariable
          ? generateDatePickerPresets(
              inputTypeCoerced,
              operator,
              customDate,
              set,
            )
          : undefined
      }
      value={handelValue(parseDate(value))}
      showTime={['datetime-local', 'datetime'].includes(inputTypeCoerced)}
      className={className}
      disabled={disabled}
      placeholder={placeHolderText}
      onClick={(e) => {
        e.stopPropagation();
        setOpen(!open);
      }}
      onChange={change}
      allowClear
      format={(dateValue) =>
        generateDatePickerFormat(staticFormat)(value, dateValue, customDate)
      }
      data-testid={'datetime-local'}
    />
  );
};
