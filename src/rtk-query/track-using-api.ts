import type {
  ImUsingBody,
  ImUsingResponse,
  WhoIsUsingQuery,
  WhoIsUsingResponse,
} from '../../packages/ratan-track-using/src';
import { baseApi as api } from './baseApi';

const injectedRtkApi = api.injectEndpoints({
  endpoints: (build) => ({
    postImUsing: build.query<ImUsingResponse, ImUsingBody>({
      query: (queryArg) => ({
        url: '/track-using/im-using',
        method: 'POST',
        body: queryArg,
      }),
    }),
    queryWhoIsUsing: build.query<WhoIsUsingResponse, WhoIsUsingQuery>({
      query: (params) => ({
        url: '/track-using/who-is-using',
        method: 'GET',
        params,
      }),
    }),
  }),
  overrideExisting: false,
});
export { injectedRtkApi as trackUsingApi };

export const { useLazyPostImUsingQuery, useLazyQueryWhoIsUsingQuery } =
  injectedRtkApi;
