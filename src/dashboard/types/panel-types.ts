import type { SeriesLineOptions, SeriesPieOptions } from 'highcharts';
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

// export type PanelTimelineChartData = {
//   xAxis: {
//     data: string[];
//   };
//   series: {
//     name: string;
//     data: number[];
//     type: 'timeline';
//   }[];
// };

export type PanelTimelineChartData = {
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
  title: {
    text: '';
  };
  chart: { type: 'pie' };
  series: SeriesPieOptions[];
};

export type PanelMetricData = {
  value: string;
};

export type RatanDashboardPanel = RatanDashboardPanelSchema & {
  data:
    | PanelTableData
    | PanelChartData
    | PanelTimelineChartData
    | PanelMetricData
    | PanelPieChartData
    | null;
};
