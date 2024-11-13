import type { Observable, Subscription } from 'rxjs';

import type { NotifyConfig } from '../notify/type';

export type SchedulerBrokerType = {
  processor: Observable<any>;
  notify: NotifyConfig<any>;
};

export type SchedulerItemType = {
  broker: SchedulerBrokerType;
  subscription: Subscription;
  createdAt: number;
};
