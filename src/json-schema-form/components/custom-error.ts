import type { FormProps } from '@rjsf/core';

export const transformErrors: FormProps['transformErrors'] = (
  errors,
  uiSchema,
) => {
  console.log(errors, uiSchema);
  return errors.map((error) => {
    if (error.name === 'pattern') {
      error.message = 'pattern error';
    }
    if (error.name === 'required') {
      error.message = 'This field is required';
    }
    return error;
  });
};

export const customValidate: FormProps['customValidate'] = (
  formData,
  errors,
  uiSchema,
) => {
  //   if (formData.pass1 !== formData.pass2) {
  //     errors.pass2?.addError("Passwords don't match");
  //   }
  return errors;
};
