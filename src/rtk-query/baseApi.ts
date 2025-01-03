// Or from '@reduxjs/toolkit/query' if not using the auto-generated hooks
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
// import { axiosBaseQuery } from './baseApiWrapper/axios';
import {
  AUTH_REQUEST_HEADER,
  REQUEST_HEADER_USER_ID,
} from 'src/authentication/const/headers';

// initialize an empty api service that we'll inject endpoints into later as needed
export const baseApi = createApi({
  reducerPath: 'baseApi',
  baseQuery: fetchBaseQuery({
    baseUrl: '',
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
  // baseQuery: axiosBaseQuery({ baseUrl: '',  }),
  // tagTypes: ['Cashflow'],
  endpoints: () => ({}),
});
