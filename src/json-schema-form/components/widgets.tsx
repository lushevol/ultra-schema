import { generateWidgets } from '@rjsf/antd';
import type { FormProps } from '@rjsf/core';
import type { WidgetProps } from '@rjsf/utils';

const { Input } = generateWidgets();

export const CustomInput = (props: WidgetProps) => {
  return <Input {...props} allowClear />;
};

export const widgets: FormProps['widgets'] = {
  Input: CustomInput,
};
