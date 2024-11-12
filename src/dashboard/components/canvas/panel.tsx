import { Card } from 'antd';
import type {
  PanelTableData,
  RatanDashboardPanel,
} from 'src/dashboard/types/panel-types';
import { TablePanel } from '../table';

export const Panel = ({ panel }: { panel: RatanDashboardPanel }) => {
  return (
    <Card
      className="ratan-dashboard-panel"
      title={panel.title}
      style={{ height: '100%' }}
    >
      <PanelContent panel={panel} />
    </Card>
  );
};

const PanelContent = ({ panel }: { panel: RatanDashboardPanel }) => {
  switch (panel.type) {
    case 'table':
      return (
        <TablePanel
          rows={(panel.data as PanelTableData).rows}
          columns={(panel.data as PanelTableData).columns}
        />
      );
    default:
      return <div className="unknown-panel-type">Unknown panel type</div>;
  }
};
