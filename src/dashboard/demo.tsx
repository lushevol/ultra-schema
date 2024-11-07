import { useSelector } from 'react-redux';
import DashboardCanvas from './components/canvas';
import type { RootState } from 'src/store';
import useDashboard from './hooks/useDashboard';
import { TablePanel } from './components/table';
import { usePromise, usePromiseAll } from './hooks/usePromise';

export default function Demo() {
  const schema = useSelector((state: RootState) => state.dashboard.schema);
  const { panels } = useDashboard(schema);
  const { data: panelsData, isLoading: panelsLoading } = usePromiseAll(panels);
  return (
    <DashboardCanvas schema={schema}>
      {panelsData.map((panel) => (
        <TablePanel
          key={panel.title}
          columns={[]}
          rows={[]}
        />
      ))}
    </DashboardCanvas>
  );
}
