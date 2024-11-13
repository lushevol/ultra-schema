import { NoticeType } from "antd/es/message/interface";

export type NotifyParams<T> = {
  data?: T;
  error?: Error;
  isSuccess: boolean;
};

export type NotifyConfig<T> = (props: NotifyParams<T>) => NotifyResultType;

export type NotifyResultType = {
  title: string;
  body?: string;
  type: NoticeType;
  onClick?: ({ data }: { data: any }) => void;
  onClose?: ({ data }: { data: any }) => void;
};

export type NotifyQueueItemType = {
  timestamp: number;
  data: any;
  notify: NotifyResultType;
};

export type NotifyQueueType = NotifyQueueItemType[];
