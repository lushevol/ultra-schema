import { useMemo, useState } from 'react';
import type {
  RatanDashboardPanelSchema,
  RatanDashboardSchema,
} from '../types/dashboard-types';
import type { RatanDashboardPanel } from '../types/panel-types';
import { usePanel } from './usePanel';

export default function useDashboard(schema: RatanDashboardSchema) {
  const [panels, setPanels] = useState<RatanDashboardPanelSchema[]>(
    schema.panels,
  );
  const { refreshPanel } = usePanel();

  const finalPanels = useMemo<Promise<RatanDashboardPanel>[]>(
    () =>
      panels
        .map((panel) => refreshPanel(panel))
        .filter((panel): panel is Promise<RatanDashboardPanel> => !panel),
    [panels, refreshPanel],
  );

  return {
    title: schema.title,
    description: schema.description,
    refreshInterval: schema.refreshInterval,
    panels: finalPanels,
  };
}
