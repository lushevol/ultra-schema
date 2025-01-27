import type { FilterArg } from 'src/rtk-query/types.generated';

export type RatanDashboardPanelSchemaType =
  | 'table'
  | 'metric'
  | 'pie'
  | 'timeline';

export type RatanDashboardPanelSchema = {
  id: string;
  title: string;
  subTitle?: string;
  unit?: 'percentage' | 'amount';
  type: RatanDashboardPanelSchemaType;
  query: RatanDashboardQueryType;
  hide?: boolean;
  layout: {
    x: number;
    y: number;
    w: number;
    h: number;
  };
};

type RatanDashboardQueryEndpoint =
  | 'SettlementCashflowBlotterQuery'
  | 'SettlementCashflowBlotterCountQuery'
  | 'SettlementGroupBlotterQuery'
  | 'SettlementGroupBlotterCountQuery'
  | 'SettlementExceptionCodeStatisticsQuery'
  | 'Rate2USDQuery';

export type RatanDashboardQueryType = {
  queries: {
    queryApi: {
      endpoint: RatanDashboardQueryEndpoint;
      payload: Record<string, unknown>;
      body: string[];
    };
    resultTransform: string;
  }[];
  aggregation: string;
};

export type RatanDashboardSchema = {
  title: string;
  description?: string;
  refreshInterval?: number;
  globalFilters: Array<RatanDashboardFilter>;
  context: Record<string, unknown>;
  panels: RatanDashboardPanelSchema[];
};

export type RatanDashboardFilter = {
  domain: FilterBusinessDomain[];
  filter: FilterArg;
};

type FilterBusinessDomain =
  | 'SettlementCashflowBlotter'
  | 'SettlementGroupBlotter';
