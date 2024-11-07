import type {
  RatanDashboardDataSource,
  RatanDashboardPanelType,
  RatanDashboardQueryType,
} from './my-dashboard-types';

export type DashboardPanelQuery = {
  dataSource: RatanDashboardDataSource;
  queryType: RatanDashboardQueryType;
  query: string;
  panelType: RatanDashboardPanelType;
};

export type DashboardPanelResponse = {
  data: ResponseListData | ResponseObjectData;
};

export type ResponseListData = Record<string, string | number | boolean>[];
type ResponseObjectData = Record<string, string | number | boolean>;

export type PanelTableData = {
  columns: string[];
  rows: Record<string, string | number | boolean>[];
};

export type PanelChartData = {
  xAxis: {
    data: string[];
  };
  series: {
    name: string;
    data: string[];
  }[];
};
