import Form from '@rjsf/antd';
// import Form from '@rjsf/mui';
import type FormType from '@rjsf/core';
import type { IChangeEvent } from '@rjsf/core';
import type { UiSchema } from '@rjsf/utils';
import validator from '@rjsf/validator-ajv8';
import { Form as AntdForm } from 'antd';
import { produce } from 'immer';
import { useRef, useState } from 'react';
import { useSelector } from 'react-redux';
import type { RootState } from 'src/store';
import { templates } from '../../templates';
import { widgets } from '../../widgets';
import { SchemaEditor } from './schema-editor';
import ssiFormMockData from './ssi-form-mock.generated.json';
import type { SsiFormJsonSchema } from './ssi-form-types.generated';
import ssi_form_ui_schema from './ssi-form-ui-schema.json';
import { SsiFormRoot } from './style';

const uiSchema = ssi_form_ui_schema as UiSchema;

const log = (type: string) => console.log.bind(console, type);

export const RSJFDemo = () => {
  const schema = useSelector((state: RootState) => state.jsonSchemaForm.schema);
  const formRef = useRef<FormType>(null);
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

  console.log(formRef.current);

  return (
    <div>
      <SchemaEditor />
      <SsiFormRoot className="ssi-form-root">
        <Form
          ref={formRef}
          schema={schema}
          uiSchema={uiSchema}
          formData={formData}
          validator={validator}
          templates={templates}
          widgets={widgets}
          onChange={handleFormDataChange}
          onSubmit={log('submitted')}
          onError={log('errors')}
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
        />
      </SsiFormRoot>
    </div>
  );
};

const validateBicCode = (str: string) => {
  return /^(([A-Z0-9]{8})|([A-Z0-9]{11}))$/.test(str);
};
