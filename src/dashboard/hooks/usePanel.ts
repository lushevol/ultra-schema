import { useCallback } from 'react';
import type { RatanDashboardPanelSchema } from '../types/dashboard-types';
import type { RatanDashboardPanel } from '../types/panel-types';
import { panelDataConvertor } from '../utils/aggregation';
import { useQueryRouter } from './useQueryRouter';

export const usePanelQuery = () => {
  const { execQuery } = useQueryRouter();
  const refreshPanel = useCallback(
    async (panel: RatanDashboardPanelSchema): Promise<RatanDashboardPanel> => {
      const panelData = await execQuery(panel);
      return { ...panel, data: panelDataConvertor(panel, panelData) };
    },
    [execQuery],
  );

  return {
    refreshPanel,
  };
};
