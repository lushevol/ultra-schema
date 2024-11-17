import { generateTemplates } from '@rjsf/antd';
import type { FormProps } from '@rjsf/core';
import type { FieldTemplateProps } from '@rjsf/utils';

const { FieldTemplate } = generateTemplates();

export function CustomFieldTemplate(props: FieldTemplateProps) {
  return FieldTemplate ? <FieldTemplate {...props} /> : null;
}

export const templates: FormProps['templates'] = {
  FieldTemplate: CustomFieldTemplate,
};
