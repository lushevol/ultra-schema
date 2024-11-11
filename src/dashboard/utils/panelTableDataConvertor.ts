import type { PanelTableData } from '../types/panel-types';
import type { ResponseESListData } from '../types/query-and-respond-types';
import type { ResponseListData } from '../types/query-and-respond-types';

export const convertPanelTableData = (
  data: ResponseListData,
): PanelTableData => {
  return {
    columns: Object.keys(data[0] ?? {}),
    rows: data ?? [],
  };
};

export const convertESPanelTableData = (
  data: ResponseESListData,
): PanelTableData => {
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
    columns,
    rows,
  };
};
