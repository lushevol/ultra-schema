import type { BaseQueryFn } from '@reduxjs/toolkit/query';
import axios, { type AxiosError, type AxiosRequestConfig } from 'axios';
import { REQUEST_HEADER_USER_ID } from 'src/authentication/const/headers';
import type { RootState } from 'src/store';

export const axiosBaseQuery =
  (
    { baseUrl }: { baseUrl: string } = { baseUrl: '' },
  ): BaseQueryFn<
    {
      url: string;
      method?: AxiosRequestConfig['method'];
      data?: AxiosRequestConfig['data'];
      params?: AxiosRequestConfig['params'];
      headers?: AxiosRequestConfig['headers'];
    },
    unknown,
    unknown
  > =>
  async ({ url, method, data, params, headers }, api) => {
    try {
      const store = api.getState() as RootState;
      const newHeaders = {
        ...headers,
        [REQUEST_HEADER_USER_ID]: store.authentication.userInfo.id,
      };
      const result = await axios({
        url: baseUrl + url,
        method,
        data,
        params,
        headers: newHeaders,
      });
      return { data: result.data };
    } catch (axiosError) {
      const err = axiosError as AxiosError;
      return {
        error: {
          status: err.response?.status,
          data: err.response?.data || err.message,
        },
      };
    }
  };
