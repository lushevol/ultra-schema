import { type PayloadAction, createSlice } from '@reduxjs/toolkit';
import type { UserInfo } from 'src/authentication/types/user';

type AuthenticationRootType = {
  userInfo: UserInfo;
  authToken: string;
  refreshToken: string;
};

export const authenticationSlice = createSlice({
  name: 'authentication',
  initialState: {
    userInfo: {},
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
});

export const { setUserInfo, setAuthToken, setRefreshToken } =
  authenticationSlice.actions;

export default authenticationSlice.reducer;

export type AuthenticationSlice = typeof authenticationSlice;
