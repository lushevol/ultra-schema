import { NotificationInstance } from "antd/es/notification/interface";

import { NotificationCenterConfig } from "../config";
import { NotifyQueue } from "../notify";
import { NotifyInstance } from "../notifyInstance";
import { NotificationScheduler } from "../scheduler";
import { SchedulerBrokerType } from "../scheduler/type";

export class NotificationCenter {
  config = NotificationCenterConfig;
  scheduler = new NotificationScheduler();
  notify = new NotifyQueue();
  notifyInstance: NotifyInstance;
  constructor({
    antdNotificationInstance,
  }: {
    antdNotificationInstance?: NotificationInstance;
  }) {
    this.scheduler.subject$.subscribe((notify) => {
      this.notify.push(notify);
    });
    this.notify.subject$.subscribe((notifyQueueItem) => {
      this.notifyInstance.open(notifyQueueItem);
    });
    this.notifyInstance = new NotifyInstance(antdNotificationInstance);
  }

  schedule(broker: SchedulerBrokerType) {
    this.scheduler.add(broker);
  }
}
