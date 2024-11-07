import { useCallback } from 'react';
import { useLazyQueryPanelQuery } from 'src/rtk-query/dashboardApi';
import type { RatanDashboardPanel } from '../types/my-dashboard-types';
import type { PanelTableData } from '../types/query-and-respond-types';
import type { PanelChartData } from '../types/query-and-respond-types';

export const usePanel = () => {
  const refreshPanel = useCallback(async (panel: RatanDashboardPanel) => {
    const [queryPanel] = useLazyQueryPanelQuery();
    const response = await queryPanel({
      dataSource: panel.datasource,
      queryType: panel.queryType,
      query: panel.query,
      panelType: panel.type,
    }).unwrap();
    switch (panel.type) {
      case 'table':
        return {
          ...panel,
          data: response.data as PanelTableData,
        };
      case 'chart':
        return {
          ...panel,
          data: response.data as PanelChartData,
        };
      default:
        return { ...panel, data: null };
    }
  }, []);

  return {
    refreshPanel,
  };
};
