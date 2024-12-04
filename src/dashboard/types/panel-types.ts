import type { SeriesLineOptions, SeriesPieOptions } from 'highcharts';
import type { RatanDashboardPanelSchema } from './dashboard-types';

export type PanelTableData = {
  columns?: (string | { field: string; label: string })[];
  rows: Array<Record<string, string | number | boolean | null>>;
};

export type PanelTimelineChartData = {
  xAxis: {
    categories: string[];
  };
  series: {
    name: string;
    data: number[];
  }[];
};

export type HighchartsLineChartType = {
  title: {
    text: '';
  };
  chart: { type: 'line' };
  xAxis: {
    categories: string[];
  };
  series: SeriesLineOptions[];
};

// export type PanelPieChartData = {
//   series: [string, number][];
// };

export type PanelPieChartData = {
  data: Array<{ field: string; value: number }>;
};

export type HighchartsPieChartType = {
  title: {
    text: '';
  };
  chart: { type: 'pie' };
  series: SeriesPieOptions[];
};

export type PanelMetricData = {
  value: string;
  unit?: 'percentage' | 'amount';
  subTitle?: string;
};

export type RatanDashboardPanelDataTypes =
  | PanelTableData
  | PanelTimelineChartData
  | PanelMetricData
  | PanelPieChartData
  | null;

export type RatanDashboardPanel = RatanDashboardPanelSchema & {
  data: RatanDashboardPanelDataTypes;
};
