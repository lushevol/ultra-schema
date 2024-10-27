import { RSJFDemo } from '../json-schema-form/demo/ssi-form';
import { AgGridWithSchema } from '../aggrid/components/demo/cashflow-data-grid';
import { DemoLayout } from './layout';

export const Demo = () => {
  return (
    <DemoLayout>
      {/* <RSJFDemo /> */}
      <AgGridWithSchema />
    </DemoLayout>
  );
};
