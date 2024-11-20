import { createApi } from '@reduxjs/toolkit/query/react';
import { graphqlRequestBaseQuery } from '@rtk-query/graphql-request-base-query';

export const graphqlApi = createApi({
  baseQuery: graphqlRequestBaseQuery({
    url: '/graphql',
  }),
  endpoints: () => ({}),
});

export const api = graphqlApi;
