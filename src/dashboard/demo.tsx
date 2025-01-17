import { type RootState, useAppSelector } from 'src/store';
import DashboardCanvas from './components/canvas';
import { Panel } from './components/canvas/panel';
import useDashboard from './hooks/useDashboard';

export default function Demo() {
  const { schema } = useAppSelector((state: RootState) => state.dashboard);
  const { panels, finalPanels, panelsLoading } = useDashboard(schema);
  return (
    <DashboardCanvas schema={schema}>
      {panels.map((panel, index) => (
        <Panel
          key={panel.id}
          panel={finalPanels[index] ?? panel}
          isLoading={panelsLoading[index]}
        />
      ))}
    </DashboardCanvas>
  );
}
