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
  data: ResponseListData;
};

export type ResponseListData = Record<string, string | number | boolean | null>[];
type ResponseObjectData = Record<string, string | number | boolean>;
export type ResponseESListData = {
  columns: {
    name: string;
    type: string;
  }[];
  rows: (string | number | boolean | null)[][];
}

export type PanelTableData = {
  columns: string[];
  rows: Record<string, string | number | boolean | null>[];
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
