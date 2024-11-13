import { notification } from 'antd';
import type { NotificationInstance } from 'antd/es/notification/interface';

import type { NotifyQueueItemType } from '../notify/type';
import { getBrowserNotification } from './BrowserNotification';

export class NotifyInstance {
  antdNotificationInstance: NotificationInstance;
  constructor(antdNotificationInstance?: NotificationInstance) {
    this.antdNotificationInstance = antdNotificationInstance ?? notification;
  }

  open(notifyQueueItem: NotifyQueueItemType) {
    const { data, notify } = notifyQueueItem;
    const { type, title, body, onClick, onClose } = notify;
    const isVisible = document.visibilityState === 'visible';
    if (isVisible) {
      return this.antdNotificationInstance[type]({
        message: title,
        description: body,
        onClick: () => onClick?.({ data }),
        onClose: () => onClose?.({ data }),
        placement: 'bottomRight',
      });
    }
    getBrowserNotification().then((browserNotification) => {
      const instance = new browserNotification(title, {
        body,
        data,
      });
      instance.addEventListener('click', () => onClick?.({ data }));
      instance.addEventListener('close', () => onClose?.({ data }));
    });
  }
}
