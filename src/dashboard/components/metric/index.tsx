import { Statistic } from 'antd';
import type { PanelMetricData } from 'src/dashboard/types/panel-types';

export const MetricPanel = ({ data }: { data: PanelMetricData }) => {
  return <Statistic value={data.value} />;
};
