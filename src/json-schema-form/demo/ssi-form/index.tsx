import Form from '@rjsf/antd';
// import Form from '@rjsf/mui';
import type FormType from '@rjsf/core';
import type { IChangeEvent } from '@rjsf/core';
import { produce, type WritableDraft } from 'immer';
import validator from '@rjsf/validator-ajv8';
import generatedJsonSchema from '../../../schema-utils/generate-json-schema-from-ratan-fields';
import type { JSONSchema7 } from 'json-schema';
import { useRef, useState } from 'react';
import type { SettlementSchemaRootType } from '../../../rtk-query/types.generated';
import ssi_form_json_schema from './ssi-form-json-schema.json';
import ssi_form_ui_schema from './ssi-form-ui-schema.json';
import type { SsiFormJsonSchema } from './ssi-form-types.generated';
import ssiFormMockData from './ssi-form-mock.generated.json';
import { templates } from '../../templates';
import { widgets } from '../../widgets';

// const schema = produce(generatedJsonSchema, (draft) => {
//   (
//     (draft.properties as WritableDraft<Record<string, JSONSchema7>>)
//       .Cashflow as WritableDraft<JSONSchema7>
//   ).dependencies = {
//     Payment_Currency: ["Payment_Amount"],
//     Payment_Amount: ["Payment_Currency"],
//   };
// });

// console.log(schema);

const schema = ssi_form_json_schema as unknown as JSONSchema7;
const uiSchema = ssi_form_ui_schema;

const log = (type: string) => console.log.bind(console, type);

export const RSJFDemo = () => {
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

  return (
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
  );
};

const validateBicCode = (str: string) => {
  return /^(([A-Z0-9]{8})|([A-Z0-9]{11}))$/.test(str);
};
