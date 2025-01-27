import type { FilterArg, GroupMsgReq } from 'src/rtk-query/types.generated';

export type CashflowBlotterGraphQLPayloadType = {
  filter?: FilterArg[] | FilterArg;
  page: number;
  size: number;
};

export type GroupBlotterGraphQLPayloadType = {
  filter?: GroupMsgReq;
  page: number;
  size: number;
};
