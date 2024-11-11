import { useSelector } from 'react-redux';
import type { RootState } from 'src/store';
import DashboardCanvas from './components/canvas';
import { Panel } from './components/canvas/panel';
import useDashboard from './hooks/useDashboard';

export default function Demo() {
  const schema = useSelector((state: RootState) => state.dashboard.schema);
  const { panels } = useDashboard(schema);
  console.log(panels);
  return (
    <DashboardCanvas schema={schema}>
      {panels.map((panel) => (
        <Panel key={panel.title} panel={panel} />
      ))}
    </DashboardCanvas>
  );
}
