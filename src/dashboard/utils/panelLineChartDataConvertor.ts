import type { PanelTimelineChartData } from '../types/panel-types';
import type {
  ResponseESListData,
  ResponseListData,
} from '../types/query-and-respond-types';

export const convertPanelTimelineChartData = (
  data: ResponseListData,
): PanelTimelineChartData => {
  const item = data[0] ?? {};
  const columns = Object.keys(item);
  const timeColumn = columns.find((i) => i.includes('time'));
  const otherColumns = columns.filter((i) => i !== timeColumn);
  if (!timeColumn) {
    return {
      chart: { type: 'line' },
      xAxis: {
        categories: [],
      },
      series: [],
    };
  }
  return {
    chart: { type: 'line' },
    xAxis: {
      categories: data.map((i) => i[timeColumn]) as string[],
    },
    series: data.reduce<PanelTimelineChartData['series']>(
      (res, cur) => {
        for (const k of otherColumns) {
          res.find((i) => i.name === k)?.data?.push(Number(cur[k]));
        }
        return res;
      },
      otherColumns.map((k) => ({
        name: k,
        data: [],
        type: 'line',
      })),
    ),
  };
};

export const convertESPanelTimelineChartData = (
  data: ResponseESListData,
): PanelTimelineChartData => {
  const timeColumn = data.columns.find((i) => i.name.includes('time'));
  const timeColumnIndex = data.columns.findIndex(
    (i) => i.name === timeColumn?.name,
  );
  const otherColumns = data.columns.filter((i) => i.name !== timeColumn?.name);
  if (!timeColumn) {
    return {
      chart: { type: 'line' },
      xAxis: {
        categories: [],
      },
      series: [],
    };
  }
  return {
    chart: { type: 'line' },
    xAxis: {
      categories: data.rows.map((i) => `${i[timeColumnIndex]}`),
    },
    series: data.rows.reduce<PanelTimelineChartData['series']>(
      (res, cur) => {
        for (let i = 0; i < otherColumns.length; i++) {
          const k = otherColumns[i];
          res.find((i) => i.name === k.name)?.data?.push(Number(cur[i]));
        }
        return res;
      },
      otherColumns.map((k) => ({
        name: k.name,
        data: [],
        type: 'line',
      })),
    ),
  };
};
