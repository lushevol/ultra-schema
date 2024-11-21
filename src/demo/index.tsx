import { ApolloProvider } from '@apollo/client';
import { Tabs } from 'antd';
import { Provider } from 'react-redux';
import BlotterQueryDemo from 'src/blotter-query/demo';
import DashboardDemo from 'src/dashboard/demo';
import { GenericConfigExamples } from 'src/generic-config/examples';
import { TrackUsingDemo } from '../../packages/ratan-track-using/src/demo';
import { client } from '../apollo/client';
import { RSJFDemo } from '../json-schema-form/demo/ssi-form';
import { store } from '../store';
import { DemoLayout } from './layout';

export const Demo = () => {
  return (
    <DemoLayout>
      <Provider store={store}>
        <ApolloProvider client={client}>
          <Tabs
            defaultActiveKey="generic-config"
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
                children: <BlotterQueryDemo />,
              },
              {
                key: 'generic-config',
                label: 'Generic Config',
                children: <GenericConfigExamples />,
              },
              {
                key: 'track-using',
                label: 'Track Using',
                children: <TrackUsingDemo />,
              },
            ]}
          />
        </ApolloProvider>
      </Provider>
    </DemoLayout>
  );
};
