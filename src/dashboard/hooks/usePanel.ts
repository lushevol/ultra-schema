import { createContext, useCallback, useContext } from 'react';
import type { ClickMetadata } from '../types/click';
import type {
  RatanDashboardPanelSchema,
  RatanDashboardSchema,
} from '../types/dashboard-types';
import type { RatanDashboardPanel } from '../types/panel-types';
import { panelDataConvertor } from '../utils/aggregation';
import { useQueryRouter } from './useQueryRouter';

export const usePanelQuery = () => {
  const { execQuery } = useQueryRouter();
  const refreshPanel = useCallback(
    async (
      panel: RatanDashboardPanelSchema,
      globalFilters: RatanDashboardSchema['globalFilters'],
    ): Promise<RatanDashboardPanel> => {
      const panelData = await execQuery(panel, globalFilters);
      return { ...panel, data: panelDataConvertor(panel, panelData) };
    },
    [execQuery],
  );

  return {
    refreshPanel,
  };
};

export const PanelClickContext = createContext<
  (schema: RatanDashboardPanel, metadata: ClickMetadata) => void
>(() => {});

const usePanelClickContext = () => {
  const onPanelClick = useContext(PanelClickContext);
  return onPanelClick;
};

export const usePanelClick = () => {
  const onPanelClick = usePanelClickContext();

  return {
    onPanelClick,
  };
};
