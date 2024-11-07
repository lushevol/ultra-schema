import { useMemo, useState } from 'react';
import type {
  RatanDashboardPanel,
  RatanDashboardSchema,
} from '../types/my-dashboard-types';
import type { PanelChartData } from '../types/query-and-respond-types';
import type { PanelTableData } from '../types/query-and-respond-types';
import { usePanel } from './usePanel';

export default function useDashboard(schema: RatanDashboardSchema) {
  const [panels, setPanels] = useState<RatanDashboardPanel[]>(schema.panels);
  const { refreshPanel } = usePanel();

  const finalPanels: Promise<
    RatanDashboardPanel & { data: PanelTableData | PanelChartData | null }
  >[] = useMemo(
    () =>
      panels.map(async (panel) => {
        return refreshPanel(panel);
      }),
    [panels, refreshPanel],
  );

  return {
    title: schema.title,
    description: schema.description,
    refreshInterval: schema.refreshInterval,
    panels: finalPanels,
  };
}
