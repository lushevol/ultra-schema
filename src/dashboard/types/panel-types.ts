import type { RatanDashboardPanelSchema } from './dashboard-types';

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

export type PanelPieChartData = {
  series: {
    name: string;
    data: number;
  }[];
};

export type PanelMetricData = {
  value: string;
};

export type RatanDashboardPanel = RatanDashboardPanelSchema & {
  data:
    | PanelTableData
    | PanelChartData
    | PanelMetricData
    | PanelPieChartData
    | null;
};
