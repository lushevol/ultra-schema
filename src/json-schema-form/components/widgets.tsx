import { generateWidgets } from '@rjsf/antd';
import type { FormProps } from '@rjsf/core';
import type { WidgetProps } from '@rjsf/utils';

const { CheckboxWidget } = generateWidgets();

const CustomCheckbox = (props: WidgetProps) => {
  return <CheckboxWidget {...props} hideLabel />;
};

export const widgets: FormProps['widgets'] = {
  CheckboxWidget: CustomCheckbox,
};
