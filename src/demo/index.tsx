import { Tabs } from 'antd';
import { Provider } from 'react-redux';
import DashboardDemo from 'src/dashboard/demo';
import { TrackUsingDemo } from '../../packages/ratan-track-using/src/demo';
import { AgGridWithSchema } from '../aggrid/demo/cashflow-data-grid';
import { RSJFDemo } from '../json-schema-form/demo/ssi-form';
import { MyQueryBuilder } from '../query-builder/demo';
import { store } from '../store';
import { DemoLayout } from './layout';

export const Demo = () => {
  return (
    <DemoLayout>
      <Provider store={store}>
        <Tabs
          items={[
            {
              key: 'ssi-form',
              label: 'SSI Form',
              children: <RSJFDemo />,
            },
            {
              key: 'dashboard',
              label: 'Dashboard',
              children: <DashboardDemo />,
            },
            {
              key: 'query-builder',
              label: 'Query Builder',
              children: (
                <>
                  <MyQueryBuilder />
                  <AgGridWithSchema />
                </>
              ),
            },
            {
              key: 'track-using',
              label: 'Track Using',
              children: <TrackUsingDemo />,
            },
          ]}
        />
      </Provider>
    </DemoLayout>
  );
};
