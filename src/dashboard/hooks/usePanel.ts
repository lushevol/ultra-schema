import { useCallback } from 'react';
import {
  useLazyQueryESQuery,
  useLazyQueryPGQuery,
} from 'src/rtk-query/dashboardApi';
import type { RatanDashboardPanelSchema } from '../types/dashboard-types';
import type { RatanDashboardPanel } from '../types/panel-types';
import type { ResponseListData } from '../types/query-and-respond-types';
import {
  convertESPanelTableData,
  convertPanelTableData,
} from '../utils/panelTableDataConvertor';

export const usePanel = () => {
  const [queryPG] = useLazyQueryPGQuery();
  const [queryES] = useLazyQueryESQuery();
  const refreshPanel = useCallback(
    async (panel: RatanDashboardPanelSchema): Promise<RatanDashboardPanel> => {
      if (panel.datasource === 'postgres') {
        const response = await queryPG({
          dataSource: panel.datasource,
          queryType: panel.queryType,
          query: panel.query,
          panelType: panel.type,
        }).unwrap();
        switch (panel.type) {
          case 'table':
            return {
              ...panel,
              data: convertPanelTableData(response as ResponseListData),
            };
          default:
            return { ...panel, data: null };
        }
      }
      if (panel.datasource === 'es') {
        const response = await queryES({
          dataSource: panel.datasource,
          queryType: panel.queryType,
          query: panel.query,
          panelType: panel.type,
        }).unwrap();
        switch (panel.type) {
          case 'table':
            return {
              ...panel,
              data: convertESPanelTableData(response),
            };
          default:
            return { ...panel, data: null };
        }
      }

      return { ...panel, data: null };
    },
    [queryPG, queryES],
  );

  return {
    refreshPanel,
  };
};