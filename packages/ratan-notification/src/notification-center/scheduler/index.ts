import { Subject } from "rxjs";

import { NotifyResultType } from "../notify/type";
import { SchedulerBrokerType, SchedulerItemType } from "./type";

export class NotificationScheduler {
  queue: SchedulerItemType[];
  subject$ = new Subject<NotifyResultType>();
  constructor() {
    this.queue = [];
  }

  add(broker: SchedulerBrokerType) {
    const { processor, notify } = broker;
    const { subject$ } = this;
    const subscription = processor.subscribe({
      next(value) {
        subject$.next(notify({ data: value, isSuccess: true }));
      },
      error(err) {
        subject$.next(notify({ error: err, isSuccess: false }));
      },
    });
    this.queue.push({
      broker,
      subscription,
      createdAt: Date.now(),
    });
  }
}
