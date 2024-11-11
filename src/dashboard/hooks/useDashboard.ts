import { useMemo, useState } from 'react';
import type {
  RatanDashboardPanelSchema,
  RatanDashboardSchema,
} from '../types/dashboard-types';
import type { RatanDashboardPanel } from '../types/panel-types';
import { usePanelQuery } from './usePanel';
import { usePromiseAll } from './usePromise';

export default function useDashboard(schema: RatanDashboardSchema) {
  const [panels, setPanels] = useState<RatanDashboardPanelSchema[]>(
    schema.panels,
  );
  const { refreshPanel } = usePanelQuery();

  const finalPanels = useMemo<Promise<RatanDashboardPanel>[]>(
    () =>
      panels
        .map((panel) => refreshPanel(panel))
        .filter((panel): panel is Promise<RatanDashboardPanel> => !!panel),
    [panels, refreshPanel],
  );

  const { data: panelsData, isLoading: panelsLoading } =
    usePromiseAll(finalPanels);

  return {
    title: schema.title,
    description: schema.description,
    refreshInterval: schema.refreshInterval,
    panels: panelsData,
    panelsLoading,
  };
}
