import { RSJFDemo } from '../json-schema-form/demo/ssi-form';
import { AgGridWithSchema } from '../aggrid/demo/cashflow-data-grid';
import { DemoLayout } from './layout';
import { Provider } from 'react-redux';
import { store } from '../store';
import { MyQueryBuilder } from '../query-builder/demo';

export const Demo = () => {
  return (
    <DemoLayout>
      <Provider store={store}>
        {/* <RSJFDemo /> */}
        <MyQueryBuilder />
        <AgGridWithSchema />
      </Provider>
    </DemoLayout>
  );
};
