import { Card, Drawer, Space } from 'antd';
import { useEffect, useState } from 'react';

import { useNotificationCenter } from '../index';
import type { NotifyQueueItemType } from '../notify/type';

export const NotificationCenterBoard = ({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) => {
  const nc = useNotificationCenter();
  const [notifyList, setNotifyList] = useState<NotifyQueueItemType[]>([]);

  useEffect(() => {
    nc.notify.subject$.subscribe((item) => {
      setNotifyList((list) => [...list, item]);
    });
  }, [nc.notify.subject$]);

  return (
    <>
      <Drawer title="Notification Center" onClose={onClose} open={open}>
        <Space direction="vertical" size={16}>
          {notifyList.map((item) => (
            <Card
              key={item.id}
              title={item.notify.title}
              bordered={false}
              extra={item.timestamp}
            >
              {item.notify.body}
            </Card>
          ))}
        </Space>
      </Drawer>
    </>
  );
};
