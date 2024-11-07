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
  data: PanelTableData | PanelChartData;
};

export type PanelTableData = {
  columns: string[];
  rows: string[][];
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
