import { type PayloadAction, createSlice } from '@reduxjs/toolkit';
import type { UserInfo } from 'src/authentication/types/user';
import {
  parseRefreshToken,
  parseUserInfo,
} from 'src/authentication/utils/parse';
import { parseAuthToken } from 'src/authentication/utils/parse';
import { authenticationApi } from 'src/rtk-query/authentication';

type AuthenticationRootType = {
  userInfo: UserInfo;
  authToken: string;
  refreshToken: string;
};

export const authenticationSlice = createSlice({
  name: 'authentication',
  initialState: {
    userInfo: {
      fullName: '',
      userId: '',
    },
    authToken: '',
    refreshToken: '',
  } as AuthenticationRootType,
  reducers: {
    setUserInfo: (state, action: PayloadAction<UserInfo>) => {
      state.userInfo = action.payload;
    },
    setAuthToken: (state, action: PayloadAction<string>) => {
      state.authToken = action.payload;
    },
    setRefreshToken: (state, action: PayloadAction<string>) => {
      state.refreshToken = action.payload;
    },
  },
  extraReducers(builder) {
    builder.addMatcher(
      authenticationApi.endpoints.login.matchFulfilled,
      (state, action) => {
        const token = action.meta.baseQueryMeta?.response?.headers
          ? parseAuthToken(action.meta.baseQueryMeta?.response?.headers)
          : null;
        if (token) {
          state.authToken = token;
        }
        // parse user info
        const userInfo = parseUserInfo(action.payload);
        if (userInfo) {
          state.userInfo = userInfo;
        }
      },
    );
    builder.addMatcher(
      authenticationApi.endpoints.logout.matchFulfilled,
      (state, action) => {
        state.authToken = '';
        state.refreshToken = '';
      },
    );
    builder.addMatcher(
      authenticationApi.endpoints.refreshToken.matchFulfilled,
      (state, action) => {
        const refreshToken = action.meta.baseQueryMeta?.response?.headers
          ? parseRefreshToken(action.meta.baseQueryMeta?.response?.headers)
          : null;
        if (refreshToken) {
          state.refreshToken = refreshToken;
        }
      },
    );
    builder.addMatcher(
      authenticationApi.endpoints.extendSession.matchFulfilled,
      (state, action) => {
        const token = action.meta.baseQueryMeta?.response?.headers
          ? parseAuthToken(action.meta.baseQueryMeta?.response?.headers)
          : null;
        if (token) {
          state.authToken = token;
        }
      },
    );
    builder.addMatcher(
      authenticationApi.endpoints.reLogin.matchFulfilled,
      (state, action) => {
        const token = action.meta.baseQueryMeta?.response?.headers
          ? parseAuthToken(action.meta.baseQueryMeta?.response?.headers)
          : null;
        if (token) {
          state.authToken = token;
        }
      },
    );
  },
});

export const { setUserInfo, setAuthToken, setRefreshToken } =
  authenticationSlice.actions;

export default authenticationSlice.reducer;

export type AuthenticationSlice = typeof authenticationSlice;
