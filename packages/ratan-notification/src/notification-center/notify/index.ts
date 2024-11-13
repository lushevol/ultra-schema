import { Subject } from 'rxjs';

import type { NotifyQueueItemType, NotifyResultType } from './type';

export class NotifyQueue {
  queue: NotifyQueueItemType[];
  subject$ = new Subject<NotifyQueueItemType>();
  constructor() {
    this.queue = [];
  }

  push(notify: NotifyResultType) {
    const notifyQueueItem = {
      id: crypto.randomUUID(),
      timestamp: Date.now(),
      data: null,
      notify,
    };
    this.queue.push(notifyQueueItem);
    this.subject$.next(notifyQueueItem);
  }
}
