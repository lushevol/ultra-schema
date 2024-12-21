import { Space } from 'antd';
import useDashboard from 'src/dashboard/hooks/useDashboard';
import type { RatanDashboardSchema } from 'src/dashboard/types/dashboard-types';
import { DnD } from '../dnd';
import { SchemaEditor } from '../schema-editor';

const DashboardCanvas = ({
  schema,
  children,
}: {
  schema: RatanDashboardSchema;
  children: React.ReactNode;
}) => {
  const { title, description, refreshInterval, panels } = useDashboard(schema);
  return (
    <div className="dashboard-root">
      <Space>
        {title && <h1 className="text-2xl font-bold">{title}</h1>}
        {description && <p className="text-gray-600">{description}</p>}
        {refreshInterval && (
          <p className="text-sm text-gray-500">{refreshInterval}</p>
        )}
        <SchemaEditor />
      </Space>
      <DnD panels={panels}>{children}</DnD>
    </div>
  );
};

export default DashboardCanvas;
