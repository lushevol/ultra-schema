import { useMemo } from 'react';
import type { RatanDashboardSchema } from '../types/dashboard-types';
import type { RatanDashboardPanel } from '../types/panel-types';
import { usePanelQuery } from './usePanel';
import { usePromiseAll } from './usePromise';

export default function useDashboard(schema: RatanDashboardSchema) {
  const { refreshPanel } = usePanelQuery();

  const panelsPromises = useMemo<Promise<RatanDashboardPanel>[]>(
    () =>
      schema.panels
        .map((panel) => refreshPanel(panel))
        .filter((panel): panel is Promise<RatanDashboardPanel> => !!panel),
    [schema.panels, refreshPanel],
  );

  const { data: panelsData, isLoading: panelsLoading } =
    usePromiseAll(panelsPromises);

  return {
    title: schema.title,
    description: schema.description,
    refreshInterval: schema.refreshInterval,
    panels: schema.panels,
    finalPanels: panelsData,
    panelsLoading,
  };
}
