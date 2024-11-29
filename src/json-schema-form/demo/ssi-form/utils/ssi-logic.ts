import type { UiSchema } from '@rjsf/utils';
import { produce } from 'immer';
import type { SsiFormJsonSchema } from './ssi-form-types.generated';

const validateBicCode = (str: string) => {
  return /^(([A-Z0-9]{8})|([A-Z0-9]{11}))$/.test(str);
};

export const coverPaymentLogic = ({
  formData,
  uiSchema,
  touchField,
}: {
  formData: SsiFormJsonSchema;
  uiSchema: UiSchema;
  touchField: string;
}) => {
  const data = {
    formData,
    uiSchema,
  } as { formData: SsiFormJsonSchema; uiSchema: UiSchema };
  const newData = produce(data, (draft) => {
    if (
      draft.formData.settlementMeans === 'NOS' &&
      draft.formData.swiftType === 'MT103' &&
      validateBicCode(draft.formData.receiversCorrespondentBic ?? '')
    ) {
      draft.formData.coveredPayment = true;
      draft.uiSchema.coveredPayment['ui:disabled'] = true;
    } else {
      draft.uiSchema.coveredPayment['ui:disabled'] = false;
    }

    if (draft.formData.coveredPayment) {
      if (
        draft.formData.swiftType !== 'MT103' ||
        draft.formData.settlementMeans !== 'NOS'
      ) {
        draft.formData.coveredPayment = false;
        draft.uiSchema.coveredPayment['ui:disabled'] = false;
      }
    }
  });

  return newData;
};

export const extractFieldFromEventId = (id: string, uiSchema: UiSchema) => {
  const rootId = uiSchema['ui:rootFieldId'];

  if (rootId && id.startsWith(rootId)) {
    return id
      .split('_')
      .filter((i) => i !== rootId)
      .join('.');
  }

  return id;
};
