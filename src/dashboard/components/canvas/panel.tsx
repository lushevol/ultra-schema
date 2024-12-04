import { Button, Card } from 'antd';
import type {
  PanelMetricData,
  PanelTableData,
  RatanDashboardPanel,
} from 'src/dashboard/types/panel-types';
import { RatanHighcharts } from '../charts/highcharts';
import { MetricPanel } from '../metric';
import { TablePanel } from '../table';

export const Panel = ({
  panel,
  isLoading,
}: { panel: RatanDashboardPanel; isLoading: boolean }) => {
  return (
    <Card
      className="ratan-dashboard-panel"
      title={panel.title}
      style={{ height: '100%' }}
      size="small"
      loading={isLoading}
      hidden={panel.hide}
    >
      <PanelContent panel={panel} />
    </Card>
  );
};

const PanelContent = ({ panel }: { panel: RatanDashboardPanel }) => {
  if (!panel.data) {
    return 'No data';
  }
  switch (panel.type) {
    case 'table':
      return (
        <TablePanel
          rows={(panel.data as PanelTableData).rows}
          columns={(panel.data as PanelTableData).columns}
        />
      );
    case 'metric':
      return <MetricPanel data={panel.data as PanelMetricData} />;
    case 'pie':
      return (
        <div className="panel-pie-chart">
          <RatanHighcharts options={panel.data as Highcharts.Options} />
        </div>
      );
    case 'timeline':
      return (
        <div className="panel-timeline-chart">
          <RatanHighcharts options={panel.data as Highcharts.Options} />
        </div>
      );
    default:
      return <div className="unknown-panel-type">Unknown panel type</div>;
  }
};
