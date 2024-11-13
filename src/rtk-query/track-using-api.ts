import type {
  ImUsingBody,
  WhoIsUsingQuery,
  WhoIsUsingResponse,
} from '../../packages/ratan-track-using';
import { baseApi as api } from './baseApi';

const injectedRtkApi = api.injectEndpoints({
  endpoints: (build) => ({
    postImUsing: build.query<void, ImUsingBody>({
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
