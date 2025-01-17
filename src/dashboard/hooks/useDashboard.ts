import { useMemo, useState } from 'react';
import type { RatanDashboardSchema } from '../types/dashboard-types';
import type { RatanDashboardPanel } from '../types/panel-types';
import { usePanelQuery } from './usePanel';
import { usePromiseAll } from './usePromise';

export default function useDashboard(schema: RatanDashboardSchema) {
  const { refreshPanel: refreshPanelApi } = usePanelQuery();

  const panelsPromises = useMemo<Promise<RatanDashboardPanel>[]>(
    () =>
      schema.panels
        .map((panel) => refreshPanelApi(panel, schema.globalFilters))
        .filter((panel): panel is Promise<RatanDashboardPanel> => !!panel),
    [schema, refreshPanelApi],
  );

  const { data: panelsData, isLoading: panelsLoading } =
    usePromiseAll(panelsPromises);

  return {
    title: schema.title,
    description: schema.description,
    refreshInterval: schema.refreshInterval,
    globalFilters: schema.globalFilters,
    panels: schema.panels,
    finalPanels: panelsData,
    panelsLoading,
  };
}
