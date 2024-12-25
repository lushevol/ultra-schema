import { createApi } from '@reduxjs/toolkit/query/react';
import { graphqlRequestBaseQuery } from '@rtk-query/graphql-request-base-query';
import {
  AUTH_REQUEST_HEADER,
  REQUEST_HEADER_USER_ID,
} from 'src/authentication/const/headers';

export const graphqlApi = createApi({
  reducerPath: 'graphqlApi',
  // tagTypes: ['GenericConfig'],
  baseQuery: graphqlRequestBaseQuery({
    url: '/graphql',
    prepareHeaders: (headers, api) => {
      // specify RootState here will cause error, because RootState is reasoning from the api, it will cause circular dependency
      const store = api.getState();
      if (store.authentication.authToken) {
        headers.set(AUTH_REQUEST_HEADER, store.authentication.authToken);
      }
      if (store.authentication.userInfo.userId) {
        headers.set(
          REQUEST_HEADER_USER_ID,
          store.authentication.userInfo.userId,
        );
      }
      return headers;
    },
  }),
  endpoints: () => ({}),
});

export const api = graphqlApi;
