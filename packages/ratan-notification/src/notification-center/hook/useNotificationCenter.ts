import { createContext, useContext } from "react";

import { NotificationCenter } from "../center";

type NotificationCenterContextType = {
  notificationCenter: NotificationCenter;
};

export const NotificationCenterContext =
  createContext<NotificationCenterContextType>({
    notificationCenter: new NotificationCenter({}),
  });

export const useNotificationCenter = () => {
  const { notificationCenter } = useContext(NotificationCenterContext);

  return notificationCenter;
};
