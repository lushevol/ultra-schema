import { generateTemplates } from '@rjsf/antd';
import type { FormProps } from '@rjsf/core';
import type { BaseInputTemplateProps, FieldTemplateProps } from '@rjsf/utils';

const { FieldTemplate, BaseInputTemplate } = generateTemplates();

export function CustomFieldTemplate(props: FieldTemplateProps) {
  return FieldTemplate ? <FieldTemplate {...props} displayLabel /> : null;
}

export const CustomBaseInputTemplate = (props: BaseInputTemplateProps) => {
  return BaseInputTemplate ? <BaseInputTemplate {...props} allowClear /> : null;
};

export const templates: FormProps['templates'] = {
  FieldTemplate: CustomFieldTemplate,
  BaseInputTemplate: CustomBaseInputTemplate,
};
