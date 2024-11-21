import {
  ApolloClient,
  HttpLink,
  InMemoryCache,
  from,
  split,
} from '@apollo/client';
import { loadDevMessages, loadErrorMessages } from '@apollo/client/dev';
import { onError } from '@apollo/client/link/error';
import { GraphQLWsLink } from '@apollo/client/link/subscriptions';
import { getMainDefinition } from '@apollo/client/utilities';
import { createClient } from 'graphql-ws';

const httpLink = new HttpLink({
  uri: '/graphql',
});

const wsLink = new GraphQLWsLink(
  createClient({
    url: '/subscriptions',
    connectionAckWaitTimeout: 2000,
    keepAlive: 10_000,
    retryAttempts: 5,
    shouldRetry() {
      return true;
    },
    // on: {
    //   error(er) {
    //     console.error(er);
    //   },
    //   opened(e) {
    //     console.log(e);
    //   },
    //   closed(e) {
    //     console.log(e);
    //   },
    //   connected(e) {
    //     console.log(e);
    //   },
    //   message(e) {
    //     console.log(e);
    //   },
    // },
  }),
);

const splitLink = split(
  ({ query }) => {
    const definition = getMainDefinition(query);
    return (
      definition.kind === 'OperationDefinition' &&
      definition.operation === 'subscription'
    );
  },
  wsLink,
  httpLink,
);

const errorLink = onError(({ graphQLErrors, networkError }) => {
  if (graphQLErrors) {
    // for (let err of graphQLErrors) {
    //   switch (err.extensions.code) {
    //     // Apollo Server sets code to UNAUTHENTICATED
    //     // when an AuthenticationError is thrown in a resolver
    //     case "UNAUTHENTICATED":
    //       // Modify the operation context with a new token
    //       const oldHeaders = operation.getContext().headers;
    //       operation.setContext({
    //         headers: {
    //           ...oldHeaders,
    //           authorization: getNewToken(),
    //         },
    //       });
    //       // Retry the request, returning the new observable
    //       return forward(operation);
    //   }
    // }
    graphQLErrors.forEach(({ message, locations, path }) =>
      console.log(
        `[GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path}`,
      ),
    );
  }

  // To retry on network errors, we recommend the RetryLink
  // instead of the onError link. This just logs the error.
  if (networkError) {
    console.log(`[Network error]: ${networkError}`);
  }
});

if (import.meta.env.DEV) {
  loadDevMessages();
  loadErrorMessages();
}

export const client = new ApolloClient({
  link: from([errorLink, splitLink]),
  cache: new InMemoryCache(),
  connectToDevTools: true,
});
