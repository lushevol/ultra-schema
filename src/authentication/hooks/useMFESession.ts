import { useCallback } from 'react';
import {
  useLazyExtendSessionQuery,
  useLazyLoginQuery,
  useLazyLogoutQuery,
  useLazyReLoginQuery,
  useLazyRefreshTokenQuery,
} from 'src/rtk-query/authentication';
import { useAppSelector } from 'src/store';
import { setAuthToken, setRefreshToken } from 'src/store/slices/authentication';
import type { LoginPayload } from '../types/request';
import { parseAuthToken, parseRefreshToken } from '../utils/parse';

export const useMFESession = () => {
  const { authToken, refreshToken } = useAppSelector(
    (state) => state.authentication,
  );
  const [loginQuery] = useLazyLoginQuery();
  const [extendSessionQuery] = useLazyExtendSessionQuery();
  const [logoutQuery] = useLazyLogoutQuery();
  const [refreshTokenQuery] = useLazyRefreshTokenQuery();
  const [reLoginQuery] = useLazyReLoginQuery();

  const login = useCallback(
    async (payload: LoginPayload) => {
      const resp = await loginQuery(payload);
      console.log(resp);
      const token = parseAuthToken(resp.header);
      if (token) {
        setAuthToken(token);
      }
      return resp.data;
    },
    [loginQuery],
  );

  const logout = useCallback(async () => {
    const resp = await logoutQuery(authToken);
    return resp.data;
  }, [logoutQuery, authToken]);

  const refreshSession = useCallback(async () => {
    const resp = await refreshTokenQuery(refreshToken);
    const token = parseRefreshToken(resp.header);
    if (token) {
      setRefreshToken(token);
    }
    return resp.data;
  }, [refreshTokenQuery, refreshToken]);

  const extendSession = useCallback(async () => {
    const resp = await extendSessionQuery(authToken);
    const token = parseAuthToken(resp.header);
    if (token) {
      setAuthToken(token);
    }
    return resp.data;
  }, [extendSessionQuery, authToken]);

  const reLogin = useCallback(async () => {
    const resp = await reLoginQuery({ entities: [] });
    return resp.data;
  }, [reLoginQuery]);

  return {
    login,
    logout,
    refreshSession,
    extendSession,
    reLogin,
  };
};
