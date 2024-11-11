import useDashboard from 'src/dashboard/hooks/useDashboard';
import type { RatanDashboardSchema } from 'src/dashboard/types/dashboard-types';
import { DnD } from '../dnd';

const DashboardCanvas = ({
  schema,
  children,
}: { schema: RatanDashboardSchema; children: React.ReactNode }) => {
  const { title, description, refreshInterval } = useDashboard(schema);
  return (
    <div>
      {title && <h1>{title}</h1>}
      {description && <p>{description}</p>}
      {refreshInterval && <p>{refreshInterval}</p>}
      <DnD>{children}</DnD>
    </div>
  );
};

export default DashboardCanvas;
