// import Form from '@rjsf/mui';
import type FormType from '@rjsf/core';
import type { IChangeEvent } from '@rjsf/core';
import type { UiSchema } from '@rjsf/utils';
import { Button, Divider, Space } from 'antd';
import { createRef, useState } from 'react';
import { useSelector } from 'react-redux';
import { StyledForm } from 'src/json-schema-form/components/styled-form';
import { templates } from 'src/json-schema-form/components/templates';
import type { RootState } from 'src/store';
import { SchemaEditor } from './components/schema-editor';
import { ssiFormTemplates } from './components/templates';
import { SsiFormRoot } from './components/templates/style';
import ssi_form_ui_schema from './schema/ssi-form-ui-schema.json';
import ssiFormMockData from './utils/ssi-form-mock.generated.json';
import type { SsiFormJsonSchema } from './utils/ssi-form-types.generated';
import { coverPaymentLogic, extractFieldFromEventId } from './utils/ssi-logic';

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

  const handleFormDataChange = (e: IChangeEvent, id?: string) => {
    console.log(e, id);
    const touchField = extractFieldFromEventId(`${id}`, e.uiSchema);
    const newData = coverPaymentLogic({
      formData: e.formData as SsiFormJsonSchema,
      uiSchema,
      touchField,
    });

    setFormData(newData.formData);
    setUiSchema(newData.uiSchema);
  };

  const handleSubmit = () => {
    console.log(formRef.current?.submit());
  };

  const handleReset = () => {
    formRef.current?.reset();
  };

  console.log(formRef.current);

  return (
    <div>
      <Space>
        <Button type="primary" onClick={handleSubmit}>
          Submit
        </Button>
        <Button onClick={handleReset}>Reset</Button>
        <SchemaEditor />
      </Space>
      <Divider />
      <SsiFormRoot className="ssi-form-root">
        <StyledForm
          ref={formRef}
          schema={schema}
          uiSchema={uiSchema}
          formData={formData}
          onChange={handleFormDataChange}
          templates={customTemplates}
        />
      </SsiFormRoot>
    </div>
  );
};
