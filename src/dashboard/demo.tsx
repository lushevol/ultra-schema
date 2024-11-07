import { useSelector } from 'react-redux';
import type { RootState } from 'src/store';
import DashboardCanvas from './components/canvas';
import { TablePanel } from './components/table';
import useDashboard from './hooks/useDashboard';
import { usePromise, usePromiseAll } from './hooks/usePromise';

export default function Demo() {
  const schema = useSelector((state: RootState) => state.dashboard.schema);
  const { panels } = useDashboard(schema);
  const { data: panelsData, isLoading: panelsLoading } = usePromiseAll(panels);
  return (
    <DashboardCanvas schema={schema}>
      {panelsData.map((panel) => (
        <TablePanel key={panel.title} columns={[]} rows={[]} />
      ))}
    </DashboardCanvas>
  );
}
