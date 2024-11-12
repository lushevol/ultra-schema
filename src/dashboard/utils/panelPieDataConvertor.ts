import type { PanelPieChartData } from '../types/panel-types';
import type {
  ResponseESListData,
  ResponseListData,
} from '../types/query-and-respond-types';

export const convertPanelPieChartData = (
  data: ResponseListData,
): PanelPieChartData => {
  return {
    series: (data as PanelPieChartData['series']) ?? [],
  };
};

export const convertESPanelPieChartData = (
  data: ResponseESListData,
): PanelPieChartData => {
  const columns = data.columns.map((i) => i.name);
  const rows = data.rows.reduce<ResponseListData>((res, cur) => {
    const item: Record<string, string | number | boolean | null> = {};
    columns.forEach((k, i) => {
      item[k] = cur[i];
    });
    res.push(item);
    return res;
  }, []);
  return {
    series: rows as PanelPieChartData['series'],
  };
};
