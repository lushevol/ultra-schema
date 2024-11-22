// import Form from '@rjsf/mui';
import type FormType from '@rjsf/core';
import type { IChangeEvent } from '@rjsf/core';
import type { UiSchema } from '@rjsf/utils';
import { Button, Divider, Space } from 'antd';
import { produce } from 'immer';
import { createRef, useState } from 'react';
import { useSelector } from 'react-redux';
import { StyledForm } from 'src/json-schema-form/components/styled-form';
import type { RootState } from 'src/store';
import { SchemaEditor } from './schema-editor';
import ssiFormMockData from './ssi-form-mock.generated.json';
import type { SsiFormJsonSchema } from './ssi-form-types.generated';
import ssi_form_ui_schema from './ssi-form-ui-schema.json';
import { SsiFormRoot } from './style';

const uiSchema = ssi_form_ui_schema as UiSchema;

const log = (type: string) => console.log.bind(console, type);

export const RSJFDemo = () => {
  const schema = useSelector((state: RootState) => state.jsonSchemaForm.schema);
  const formRef = createRef<FormType>();
  const [formData, setFormData] = useState<SsiFormJsonSchema>(
    ssiFormMockData as SsiFormJsonSchema,
  );

  const handleFormDataChange = (e: IChangeEvent) => {
    const formData = produce(e.formData as SsiFormJsonSchema, (draft) => {
      if (
        draft.settlementMeans === 'NOS' &&
        draft.swiftType === 'MT103' &&
        validateBicCode(draft.receiversCorrespondentBic ?? '')
      ) {
        draft.coveredPayment = true;
      } else draft.coveredPayment = false;

      if (draft.coveredPayment) {
        if (draft.swiftType !== 'MT103' || draft.settlementMeans !== 'NOS') {
          draft.coveredPayment = false;
        }
      }
    });

    setFormData(formData);
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
        />
      </SsiFormRoot>
    </div>
  );
};

const validateBicCode = (str: string) => {
  return /^(([A-Z0-9]{8})|([A-Z0-9]{11}))$/.test(str);
};
