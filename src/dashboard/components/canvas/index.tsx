import useDashboard from 'src/dashboard/hooks/useDashboard';
import type { RatanDashboardSchema } from 'src/dashboard/types/my-dashboard-types';

const DashboardCanvas = ({
  schema,
  children,
}: { schema: RatanDashboardSchema; children: React.ReactNode }) => {
  const { title, description, refreshInterval } = useDashboard(schema);
  return (
    <div>
      <h1>{title}</h1>
      <p>{description}</p>
      <p>{refreshInterval}</p>
      {children}
    </div>
  );
};

export default DashboardCanvas;
