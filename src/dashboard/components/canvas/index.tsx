import useDashboard from 'src/dashboard/hooks/useDashboard';
import type { RatanDashboardSchema } from 'src/dashboard/types/dashboard-types';

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
      <div className="flex flex-col gap-4">{children}</div>
    </div>
  );
};

export default DashboardCanvas;
