import { useCallback } from 'react';
import {
  useLazyExtendSessionQuery,
  useLazyLoginQuery,
  useLazyLogoutQuery,
  useLazyReLoginQuery,
  useLazyRefreshTokenQuery,
} from 'src/rtk-query/authentication';
import { useAppSelector } from 'src/store';
import type { LoginPayload } from '../types/request';

export const useMFESession = () => {
  const { authToken, refreshToken, userInfo } = useAppSelector(
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
    return resp.data;
  }, [refreshTokenQuery, refreshToken]);

  const extendSession = useCallback(async () => {
    const resp = await extendSessionQuery(authToken);
    return resp.data;
  }, [extendSessionQuery, authToken]);

  const reLogin = useCallback(async () => {
    const resp = await reLoginQuery({ entities: [] });
    return resp.data;
  }, [reLoginQuery]);

  return {
    userInfo,
    authToken,
    login,
    logout,
    refreshSession,
    extendSession,
    reLogin,
  };
};
