import { Provider } from 'react-redux';
import DashboardDemo from 'src/dashboard/demo';
import { AgGridWithSchema } from '../aggrid/demo/cashflow-data-grid';
import { RSJFDemo } from '../json-schema-form/demo/ssi-form';
import { MyQueryBuilder } from '../query-builder/demo';
import { store } from '../store';
import { DemoLayout } from './layout';

export const Demo = () => {
  return (
    <DemoLayout>
      <Provider store={store}>
        <RSJFDemo />
        {/* <MyQueryBuilder />
        <AgGridWithSchema />
        <DashboardDemo /> */}
      </Provider>
    </DemoLayout>
  );
};
