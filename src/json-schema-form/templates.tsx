import type { FormProps } from '@rjsf/core';
import type { FieldTemplateProps } from '@rjsf/utils';
import { Templates } from '@rjsf/antd';

const FieldTemplate = Templates.FieldTemplate;

export function CustomFieldTemplate(props: FieldTemplateProps) {
  return FieldTemplate ? <FieldTemplate {...props} /> : null;
}

export const templates: FormProps['templates'] = {
  FieldTemplate: CustomFieldTemplate,
};
