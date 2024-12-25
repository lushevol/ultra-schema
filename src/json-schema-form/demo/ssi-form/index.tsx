// import Form from '@rjsf/mui';
import type FormType from '@rjsf/core';
import type { IChangeEvent } from '@rjsf/core';
import type { RJSFValidationError, UiSchema } from '@rjsf/utils';
import { Button, Divider, Space } from 'antd';
import { createRef, useState } from 'react';
import { useSelector } from 'react-redux';
import { StyledForm } from 'src/json-schema-form/components/styled-form';
import { templates } from 'src/json-schema-form/components/templates';
import { extractFieldFromEventId } from 'src/json-schema-form/utils/rjsf-utils';
import type { RootState } from 'src/store';
import { SchemaEditor } from './components/schema-editor';
import { ssiFormTemplates } from './components/templates';
import { SsiFormRoot } from './components/templates/style';
import ssi_form_ui_schema from './schema/ssi-form-ui-schema.json';
import ssiFormMockData from './utils/ssi-form-mock.generated.json';
import type { SsiFormJsonSchema } from './utils/ssi-form-types.generated';
import { coverPaymentLogic } from './utils/ssi-logic';

const customTemplates = {
  ...templates,
  ...ssiFormTemplates,
};

export const RSJFDemo = () => {
  const schema = useSelector((state: RootState) => state.jsonSchemaForm.schema);
  const [uiSchema, setUiSchema] = useState(ssi_form_ui_schema as UiSchema);
  const formRef = createRef<FormType>();
  const [formData, setFormData] = useState<SsiFormJsonSchema>(
    ssiFormMockData as SsiFormJsonSchema,
  );
  const [readOnly, setReadOnly] = useState(false);

  const handleFormDataChange = (e: IChangeEvent, id?: string) => {
    const touchField = extractFieldFromEventId(`${id}`, e.uiSchema);
    const newData = coverPaymentLogic({
      formData: e.formData as SsiFormJsonSchema,
      uiSchema,
      touchField,
    });

    setFormData(newData.formData);
    setUiSchema(newData.uiSchema);
  };

  const programmaticSubmit = () => {
    formRef.current?.submit();
  };

  const handleReset = () => {
    formRef.current?.reset();
  };

  const onSubmit = (e: IChangeEvent) => {
    console.log(e.formData);
  };

  const onError = (errors: RJSFValidationError[]) => {
    console.log(errors);
  };

  return (
    <div className="ssi-form-demo">
      <Space>
        <Button type="primary" onClick={programmaticSubmit}>
          Submit
        </Button>
        <Button onClick={handleReset}>Reset</Button>
        <Button onClick={() => setReadOnly(!readOnly)}>
          {readOnly ? 'Edit' : 'Read Only'}
        </Button>
        <SchemaEditor />
      </Space>
      <br />
      <SsiFormRoot className="ssi-form-root">
        <StyledForm
          ref={formRef}
          schema={schema}
          uiSchema={uiSchema}
          formData={formData}
          onChange={handleFormDataChange}
          templates={customTemplates}
          disabled={readOnly}
          onSubmit={onSubmit}
          onError={onError}
        />
      </SsiFormRoot>
    </div>
  );
};
