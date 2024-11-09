import { useCallback } from 'react';
import { useLazyQueryESQuery, useLazyQueryPanelQuery } from 'src/rtk-query/dashboardApi';
import type { RatanDashboardPanel } from '../types/my-dashboard-types';
import type { PanelTableData, ResponseESListData, ResponseListData } from '../types/query-and-respond-types';
import type { PanelChartData } from '../types/query-and-respond-types';
import { convertESPanelTableData, convertPanelTableData } from '../utils/panelTableDataConvertor';

export const usePanel = () => {
  const [queryPG] = useLazyQueryPanelQuery();
  const [queryES] = useLazyQueryESQuery();
  const refreshPanel = useCallback(
    async (panel: RatanDashboardPanel) => {
      if (panel.datasource === "postgres") {
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
              data: convertPanelTableData(response.data as ResponseListData),
            };
          case 'chart':
            return {
              ...panel,
              data: response.data as PanelChartData,
            };
          default:
            return { ...panel, data: null };
        }
      }if (panel.datasource === "es") {
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
          case 'chart':
            return {
              ...panel,
              data: response.data as PanelChartData,
            };
          default:
            return { ...panel, data: null };
        }
      }
    },
    [queryPG, queryES],
  );

  return {
    refreshPanel,
  };
};
