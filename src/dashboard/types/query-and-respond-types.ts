import type {
  RatanDashboardDataSource,
  RatanDashboardPanelSchemaType,
  RatanDashboardQueryType,
} from './dashboard-types';

export type DashboardPanelQuery = {
  dataSource: RatanDashboardDataSource;
  queryType: RatanDashboardQueryType;
  query: string;
  panelType: RatanDashboardPanelSchemaType;
};

// postgres response
export type ResponseListData = Record<
  string,
  string | number | boolean | null
>[];
export type ResponseObjectData = Record<
  string,
  string | number | boolean | null
> | null;
export type ResponseCountData = number;

// es response
export type ResponseESListData = {
  columns: {
    name: string;
    type: string; // es type: text, long, double, date
  }[];
  rows: (string | number | boolean | null)[][];
};
