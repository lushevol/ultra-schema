import type { PanelPieChartData } from '../types/panel-types';
import type {
  ResponseESListData,
  ResponseListData,
} from '../types/query-and-respond-types';

export const convertPanelPieChartData = (
  data: ResponseListData,
): PanelPieChartData => {
  const item = data[0] ?? {};
  return {
    chart: { type: 'pie' },
    series: Object.entries(item).map(([key, value]) => ({
      name: key,
      data: [Number(value)],
      type: 'pie',
    })),
  };
};

export const convertESPanelPieChartData = (
  data: ResponseESListData,
): PanelPieChartData => {
  const columns = data.columns.map((i) => i.name);
  const item = data.rows[0] ?? {};
  return {
    chart: { type: 'pie' },
    series: columns.map((k, i) => ({
      name: k,
      data: [Number(item[i])],
      type: 'pie',
    })),
  };
};
