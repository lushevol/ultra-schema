import type { ColumnsType } from 'antd/es/table';
import type { PanelTableData } from '../types/panel-types';

type SimpleArrayData = Array<Record<string, string | number | boolean>>;

export type ArrayDataWithHeader = {
  headers: ColumnsType;
  rows: SimpleArrayData;
};

export const convertPanelTableData = (
  data: SimpleArrayData | ArrayDataWithHeader,
): PanelTableData => {
  if ('headers' in data && 'rows' in data) {
    return {
      columns: data.headers,
      rows: data.rows,
    };
  }
  return {
    columns: Object.keys(data[0] ?? {}).map((key) => ({
      title: key,
      dataIndex: key,
      key,
    })),
    rows: data ?? [],
  };
};
