import type { PanelTableData } from '../types/query-and-respond-types';
import type { ResponseListData } from '../types/query-and-respond-types';

export const convertPanelTableData = (
  data: ResponseListData,
): PanelTableData => {
  return {
    columns: Object.keys(data[0]),
    rows: data,
  };
};
