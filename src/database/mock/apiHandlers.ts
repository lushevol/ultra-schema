import { http, HttpResponse } from 'msw';
import type { WhoIsUsingResponse } from 'packages/ratan-track-using/src';
import {
  AUTH_REQUEST_HEADER,
  REFRESH_TOKEN_HEADER,
} from 'src/authentication/const/headers';
import type { LoginResponse } from 'src/authentication/types/request';
import type { OpenSearchResult } from '../../blotter-query/types/open-search-query';
import type { SettlementSchemaRootType } from '../../rtk-query/types.generated';
import { mockLoginResponse } from '../auth';
import Cashflows from '../cashflow';

export const apiHandlers = [
  http.post('/opensearch/v1/call-sdk-internal/by-queryParameterSchema', () => {
    return HttpResponse.json<OpenSearchResult<SettlementSchemaRootType>>({
      totalResult: Cashflows.length,
      pageIndex: 1,
      itemsPerPage: Cashflows.length,
      pagingCursors: null,
      results: Cashflows,
    });
  }),
  http.post('/track-using/im-using', () => {
    return HttpResponse.json({});
  }),
  http.get('/track-using/who-is-using', () => {
    return HttpResponse.json<WhoIsUsingResponse>({
      users: [],
    });
  }),
  http.post('/auth/v2/sso/login', () => {
    return HttpResponse.json<LoginResponse>(mockLoginResponse, {
      headers: {
        [AUTH_REQUEST_HEADER]: `JWT_TOKEN AUTH ${Math.random()}`,
      },
    });
  }),
  http.post('/auth/v2/sso/logout', () => {
    return HttpResponse.json<LoginResponse>({
      entities: [],
      entitlementsToken: null,
      errorMessage: null,
      expiration: null,
      oud: null,
      result: true,
      userInfo: null,
    });
  }),
  http.post('/auth/v2/sso/refresh', () => {
    return HttpResponse.json<LoginResponse>(
      {
        entities: [],
        entitlementsToken: null,
        errorMessage: null,
        expiration: null,
        oud: null,
        result: true,
        userInfo: null,
      },
      {
        headers: {
          [REFRESH_TOKEN_HEADER]: `JWT_TOKEN REFRESH ${Math.random()}`,
        },
      },
    );
  }),
  http.post('/auth/v2/sso/extend', () => {
    return HttpResponse.json<LoginResponse>(
      {
        entities: [],
        entitlementsToken: null,
        errorMessage: null,
        expiration: null,
        oud: null,
        result: true,
        userInfo: null,
      },
      {
        headers: {
          [AUTH_REQUEST_HEADER]: `JWT_TOKEN AUTH ${Math.random()}`,
        },
      },
    );
  }),
  http.post('/auth/v2/sso/relogin', () => {
    return HttpResponse.json<LoginResponse>(
      {
        entities: [],
        entitlementsToken: null,
        errorMessage: null,
        expiration: null,
        oud: null,
        result: true,
        userInfo: null,
      },
      {
        headers: {
          [AUTH_REQUEST_HEADER]: `JWT_TOKEN AUTH ${Math.random()}`,
        },
      },
    );
  }),
];
