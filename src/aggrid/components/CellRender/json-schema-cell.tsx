import type { ColDef, RowNode } from '@ag-grid-community/core';
import type { RJSFSchema } from '@rjsf/utils';
import { StyledForm } from 'src/json-schema-form/components/styled-form';

export type AgGridCustomCellRenderProps<T> = {
  data: T;
  node: RowNode;
  rowIndex: number;
};

export const JsonSchemaCellGenerator =
  <T,>({
    getSchema,
    getFormData,
    updateApi,
  }: {
    getSchema: (props: AgGridCustomCellRenderProps<T>) => RJSFSchema;
    getFormData: (props: AgGridCustomCellRenderProps<T>) => T;
    updateApi?: (
      // biome-ignore lint/suspicious/noExplicitAny: <explanation>
      newFormData: any,
      props: AgGridCustomCellRenderProps<T>,
    ) => Promise<T>;
  }) =>
  (props: AgGridCustomCellRenderProps<T>): ColDef<T>['cellRenderer'] => {
    return (
      <StyledForm
        schema={getSchema(props)}
        formData={getFormData(props)}
        onChange={(e) => updateApi?.(e.formData, props)}
      />
    );
  };
