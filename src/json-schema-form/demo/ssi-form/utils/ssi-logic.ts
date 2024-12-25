import type { UiSchema } from '@rjsf/utils';
import { produce } from 'immer';
import type { SsiFormJsonSchema } from './ssi-form-types.generated';

type FormChangeProps = {
  formData: SsiFormJsonSchema;
  uiSchema: UiSchema;
  touchField: string;
};

const validateBicCode = (str: string) => {
  return /^(([A-Z0-9]{8})|([A-Z0-9]{11}))$/.test(str);
};

export const coverPaymentLogic = ({
  formData,
  uiSchema,
  touchField,
}: FormChangeProps) => {
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
      draft.uiSchema.coveredPayment = {
        ...draft.uiSchema.coveredPayment,
        'ui:disabled': true,
      };
    } else {
      draft.uiSchema.coveredPayment = {
        ...draft.uiSchema.coveredPayment,
        'ui:disabled': false,
      };
    }

    if (draft.formData.coveredPayment) {
      if (
        draft.formData.swiftType !== 'MT103' ||
        draft.formData.settlementMeans !== 'NOS'
      ) {
        draft.formData.coveredPayment = false;
        draft.uiSchema.coveredPayment = {
          ...draft.uiSchema.coveredPayment,
          'ui:disabled': false,
        };
      }
    }
  });

  return newData;
};

export const autoPopulateLogic = ({
  formData,
  uiSchema,
  touchField,
}: FormChangeProps) => {};
