import { App } from 'antd';
import { useMemo } from 'react';

import { NotificationCenter } from '../center';
import { NotificationCenterEntry } from '../component/NotificationCenterEntry';
import { NotificationCenterContext } from './useNotificationCenter';

export const NotificationCenterProvider = ({
  children,
}: { children: React.ReactNode }) => {
  const { notification } = App.useApp();
  const nc = useMemo(() => {
    return {
      notificationCenter: new NotificationCenter({
        antdNotificationInstance: notification,
      }),
    };
  }, [notification]);

  return (
    <NotificationCenterContext.Provider value={nc}>
      <NotificationCenterEntry />
      {children}
    </NotificationCenterContext.Provider>
  );
};
