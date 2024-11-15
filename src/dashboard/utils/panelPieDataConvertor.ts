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
    title: {
      text: '',
    },
    chart: { type: 'pie' },
    series: Object.entries(item).map(([key, value]) => ({
      name: key,
      y: Number(value),
      type: 'pie',
    })),
  };
};

export const convertESPanelPieChartData = (
  data: ResponseESListData,
): PanelPieChartData => {
  return {
    title: {
      text: '',
    },
    chart: { type: 'pie' },
    series: [
      {
        name: '',
        data: data.rows.map((k) => ({
          name: `${k[0]}`,
          y: Number(k[1]),
        })),
        type: 'pie',
      },
    ],
  };
};
