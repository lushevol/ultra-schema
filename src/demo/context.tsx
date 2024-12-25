import { ApolloProvider } from '@apollo/client';
import type { PropsWithChildren } from 'react';
import { Provider } from 'react-redux';
import { client } from 'src/apollo/client';
import { store } from 'src/store';

export const DemoContext = ({ children }: PropsWithChildren) => {
  return (
    <Provider store={store}>
      <ApolloProvider client={client}>{children}</ApolloProvider>
    </Provider>
  );
};
