import { type RootState, useAppSelector } from 'src/store';
import DashboardCanvas from './components/canvas';
import { Panel } from './components/canvas/panel';
import useDashboard from './hooks/useDashboard';
import { PanelClickContext } from './hooks/usePanel';
import type { RatanDashboardPanel } from './types/panel-types';

export default function Demo({
  onPanelClick,
}: { onPanelClick: (panel: RatanDashboardPanel) => void }) {
  const { schema } = useAppSelector((state: RootState) => state.dashboard);
  const { panels, finalPanels, panelsLoading } = useDashboard(schema);
  return (
    <PanelClickContext.Provider value={onPanelClick}>
      <DashboardCanvas schema={schema}>
        {panels.map((panel, index) => (
          <Panel
            key={panel.id}
            panel={finalPanels[index] ?? panel}
            isLoading={panelsLoading[index]}
          />
        ))}
      </DashboardCanvas>
    </PanelClickContext.Provider>
  );
}
