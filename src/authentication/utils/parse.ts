import {
  AUTH_REQUEST_HEADER,
  AUTH_REQUEST_HEADER_LOWER,
  REFRESH_TOKEN_HEADER,
  REFRESH_TOKEN_HEADER_LOWER,
} from '../const/headers';
import type { LoginResponse } from '../types/request';
import type { UserInfo } from '../types/user';

export const parseUserInfo = (response: LoginResponse): UserInfo | null => {
  if (response.userInfo) {
    const userInfoTemp = JSON.parse(response.userInfo);
    const userInfo: UserInfo = {
      id: userInfoTemp.sub,
      name: userInfoTemp.sub,
      fullName: userInfoTemp.fullName || userInfoTemp.sub,
      userId: userInfoTemp.sub,
      oud: userInfoTemp.oud,
      entitlements: userInfoTemp.entitlements,
    };

    if (userInfoTemp.oud) {
      userInfo.oud = JSON.parse(userInfoTemp.oud);
      userInfo.fullName = userInfoTemp.oud.fullName;
    }

    return userInfo;
  }

  return null;
};

export const parseAuthToken = (responseHeaders: Headers): string | null => {
  if (responseHeaders) {
    return (
      responseHeaders.get(AUTH_REQUEST_HEADER) ??
      responseHeaders.get(AUTH_REQUEST_HEADER_LOWER)
    );
  }

  return null;
};

export const parseRefreshToken = (responseHeaders: Headers): string | null => {
  if (responseHeaders) {
    return (
      responseHeaders.get(REFRESH_TOKEN_HEADER) ??
      responseHeaders.get(REFRESH_TOKEN_HEADER_LOWER)
    );
  }

  return null;
};
