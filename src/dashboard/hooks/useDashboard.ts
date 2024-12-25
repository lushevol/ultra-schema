import { useMemo, useState } from 'react';
import type { RatanDashboardSchema } from '../types/dashboard-types';
import type { RatanDashboardPanel } from '../types/panel-types';
import { usePanelQuery } from './usePanel';
import { usePromiseAll } from './usePromise';

export default function useDashboard(schema: RatanDashboardSchema) {
  const [refreshPanelIds, setRefreshPanelIds] = useState<string[]>([]);
  const { refreshPanel: refreshPanelApi } = usePanelQuery();

  const panelsPromises = useMemo<Promise<RatanDashboardPanel>[]>(
    () =>
      schema.panels
        .map((panel) => refreshPanelApi(panel))
        .filter((panel): panel is Promise<RatanDashboardPanel> => !!panel),
    [schema.panels, refreshPanelApi],
  );

  const panelsPromiseWithRefresh = useMemo(() => {
    
  }, [panelsPromises, refreshPanelIds]);

  const { data: panelsData, isLoading: panelsLoading } =
    usePromiseAll(panelsPromiseWithRefresh);

  return {
    title: schema.title,
    description: schema.description,
    refreshInterval: schema.refreshInterval,
    panels: schema.panels,
    finalPanels: panelsData,
    panelsLoading,
  };
}
