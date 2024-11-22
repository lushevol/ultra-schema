// Or from '@reduxjs/toolkit/query' if not using the auto-generated hooks
import { createApi } from '@reduxjs/toolkit/query/react';
import { axiosBaseQuery } from './baseApiWrapper/axios';

// initialize an empty api service that we'll inject endpoints into later as needed
export const baseApi = createApi({
  reducerPath: 'baseApi',
  baseQuery: axiosBaseQuery({ baseUrl: '' }),
  tagTypes: ['Cashflow'],
  endpoints: () => ({}),
});
