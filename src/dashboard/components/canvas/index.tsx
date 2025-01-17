import { Space } from 'antd';
import useDashboard from 'src/dashboard/hooks/useDashboard';
import type { RatanDashboardSchema } from 'src/dashboard/types/dashboard-types';
import { DnD } from '../dnd';
import { GlobalFilters } from '../filters/global-filters';
import { GlobalRefresh } from '../refresh/global-refresh';
import { SchemaEditor } from '../schema-editor';

const DashboardCanvas = ({
  schema,
  children,
}: {
  schema: RatanDashboardSchema;
  children: React.ReactNode;
}) => {
  const { title, description, panels, globalFilters } = useDashboard(schema);
  return (
    <div className="dashboard-root">
      <Space>
        {title && <h1 className="text-2xl font-bold">{title}</h1>}
        {description && <p className="text-gray-600">{description}</p>}
        <GlobalRefresh />
        <SchemaEditor />
      </Space>
      <GlobalFilters filters={globalFilters} />
      <DnD panels={panels}>{children}</DnD>
    </div>
  );
};

export default DashboardCanvas;
