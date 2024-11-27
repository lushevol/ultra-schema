import { createApi } from '@reduxjs/toolkit/query/react';
import { graphqlRequestBaseQuery } from '@rtk-query/graphql-request-base-query';

export const graphqlApi = createApi({
  reducerPath: 'graphqlApi',
  tagTypes: ['GenericConfig'],
  baseQuery: graphqlRequestBaseQuery({
    url: '/graphql',
    prepareHeaders: (headers, api) => {
      // specify RootState here will cause error, because RootState is reasoning from the api, it will cause circular dependency
      const store = api.getState();
      const newHeaders = {
        ...headers,
        'x-ratan-user-id': store.authentication.userId,
      };
      return newHeaders;
    },
  }),
  endpoints: () => ({}),
});

export const api = graphqlApi;
