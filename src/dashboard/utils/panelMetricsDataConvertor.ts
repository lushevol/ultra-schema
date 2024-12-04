import { n } from 'msw/lib/core/HttpResponse-DzhqZzTK';
import type { PanelMetricData } from '../types/panel-types';
import type {
  ResponseESListData,
  ResponseListData,
} from '../types/query-and-respond-types';

const parseMetricFromJSON = (
  row: Record<string, string | number | boolean | null>,
): string => {
  if (Object.keys(row).length === 1) {
    return `${row[`${Object.keys(row).at(0)}`]}`;
  }
  return `${row.value ?? row.count ?? '-'}`;
};

export const convertPanelMetricsData = (
  data: string | number | boolean,
): PanelMetricData => {
  return {
    value: data.toString(),
  };
};

export const convertESPanelMetricsData = (
  data: ResponseESListData,
): PanelMetricData => {
  const columns = data.columns.map((i) => i.name);
  const rows = data.rows.reduce<ResponseListData>((res, cur) => {
    const item: Record<string, string | number | boolean | null> = {};
    columns.forEach((k, i) => {
      item[k] = cur[i];
    });
    res.push(item);
    return res;
  }, []);
  const row = rows.at(0) ?? {};
  return {
    value: parseMetricFromJSON(row),
  };
};
