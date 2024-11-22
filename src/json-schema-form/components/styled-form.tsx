import styled from '@emotion/styled';
import { Form } from '@rjsf/antd';
import type { FormProps } from '@rjsf/core';
import type FormType from '@rjsf/core';
import type { RJSFSchema } from '@rjsf/utils';
import validator from '@rjsf/validator-ajv8';
import { forwardRef } from 'react';
import { templates } from './templates';
import { widgets } from './widgets';

const uiSchema = {
  'ui:rootFieldId': 'styled-form',
  'ui:globalOptions': { copyable: true },
  'ui:submitButtonOptions': {
    norender: true,
  },
};

const StyledRoot = styled.div`
  height: 100%;
  width: 100%;
  #styled-form {
    border-color: transparent;
  }
`;
export const StyledForm = forwardRef<
  FormType,
  // biome-ignore lint/suspicious/noExplicitAny: <explanation>
  Omit<FormProps<any, RJSFSchema, any>, 'validator'>
>((props, ref) => {
  return (
    <StyledRoot>
      <Form
        ref={ref}
        validator={validator}
        templates={templates}
        widgets={widgets}
        uiSchema={uiSchema}
        autoComplete="off"
        noHtml5Validate
        showErrorList={false}
        formContext={{
          descriptionLocation: 'tooltip',
          readonlyAsDisabled: false,
          labelCol: {
            span: 8,
          },
          wrapperCol: {
            span: 16,
          },
        }}
        {...props}
      />
    </StyledRoot>
  );
});
