import { Button, InputNumber, Select } from 'antd';
import type { ReactNode } from 'react';

const options = [
  {
    label: 'Business Day',
    value: 'businessDay',
  },
  {
    label: 'Calendar Day',
    value: 'calendarDay',
  },
];
export const CustomDatePickerSelect = (data, set): ReactNode => {
  const change = (value) => {
    if (value === 0) {
      if (value > data.value) {
        value++;
      } else {
        value--;
      }
    }
    set('value', Math.floor(value ?? 1));
  };

  return (
    <div
      style={{
        position: 'relative',
      }}
    >
      <div
        style={{
          borderTop: '1px solid rgba(253, 253, 253, 0.12)',
          paddingTop: '10px',
          paddingBottom: '10px',
        }}
        onClick={(e) => {
          e.stopPropagation();
        }}
        onKeyDown={(e) => {
          e.stopPropagation();
        }}
      >
        Custom Day:
        <Select
          value={data.type}
          defaultValue="businessDay"
          size="small"
          placeholder="Select"
          style={{ width: '100%', display: 'block' }}
          options={options}
          // @ts-ignore
          onChange={(value) => set('type', value)}
          data-testid="custom-day-type-select"
        />
        <div
          style={{ display: 'flex', marginTop: '3px', paddingRight: '35px' }}
        >
          <InputNumber
            value={data.value}
            defaultValue="1"
            type="number"
            size="small"
            style={{ flex: 1, marginRight: '3px' }}
            onChange={change}
            data-testid="custom-day-value-select"
          />
        </div>
      </div>
      <Button
        type="primary"
        size="small"
        style={{ position: 'absolute', bottom: '10px', right: 0 }}
      >
        Set
      </Button>
    </div>
  );
};
