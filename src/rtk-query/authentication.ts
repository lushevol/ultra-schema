import { EXTEND_SESSION_PAYLOAD } from 'src/authentication/const/payload';
import type {
  LoginPayload,
  LoginResponse,
} from 'src/authentication/types/request';
import { baseApi as api } from './baseApi';

const injectedRtkApi = api.injectEndpoints({
  endpoints: (build) => ({
    login: build.query<LoginResponse, LoginPayload>({
      query: (queryArg) => ({
        url: '/auth/v2/sso/login',
        method: 'POST',
        body: queryArg,
      }),
    }),
    logout: build.query<LoginResponse, string>({
      query: (queryArg) => ({
        url: '/auth/v2/sso/logout',
        method: 'POST',
        body: {
          [EXTEND_SESSION_PAYLOAD]: queryArg,
        },
      }),
    }),
    refreshToken: build.query<LoginResponse, string>({
      query: (queryArg) => ({
        url: '/auth/v2/sso/refresh',
        method: 'POST',
        body: {
          [EXTEND_SESSION_PAYLOAD]: queryArg,
        },
      }),
    }),
    extendSession: build.query<LoginResponse, string>({
      query: (queryArg) => ({
        url: '/auth/v2/sso/extend',
        method: 'POST',
        body: {
          [EXTEND_SESSION_PAYLOAD]: queryArg,
        },
      }),
    }),
    reLogin: build.query<LoginResponse, { entities: string[] }>({
      query: (queryArg) => ({
        url: '/auth/v2/sso/relogin',
        method: 'POST',
        body: queryArg,
      }),
    }),
  }),
  overrideExisting: false,
});
export { injectedRtkApi as openSearchApi };

export const {
  useLazyLoginQuery,
  useLazyRefreshTokenQuery,
  useLazyExtendSessionQuery,
  useLazyLogoutQuery,
  useLazyReLoginQuery,
} = injectedRtkApi;
