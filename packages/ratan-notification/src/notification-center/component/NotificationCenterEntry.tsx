import { NotificationOutlined } from '@ant-design/icons';
import { FloatButton } from 'antd';
import { useEffect, useState } from 'react';

import { useNotificationCenter } from '../index';
import { NotificationCenterBoard } from './NotificationBoard';

export const NotificationCenterEntry = () => {
  const nc = useNotificationCenter();
  const [unreadNotifyCount, setUnreadNotifyCount] = useState(0);
  const [openBoard, setOpenBoard] = useState(false);

  // biome-ignore lint/correctness/useExhaustiveDependencies: <explanation>
  useEffect(() => {
    nc.notify.subject$.subscribe(() => {
      setUnreadNotifyCount((i) => i + 1);
    });
  }, []);

  return (
    <>
      <FloatButton
        badge={{ count: unreadNotifyCount }}
        icon={<NotificationOutlined />}
        onClick={() => setOpenBoard(true)}
      />
      <NotificationCenterBoard
        open={openBoard}
        onClose={() => setOpenBoard(false)}
      />
    </>
  );
};
