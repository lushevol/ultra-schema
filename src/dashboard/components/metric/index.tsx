import type { PanelMetricData } from 'src/dashboard/types/panel-types';

export const MetricPanel = ({ data }: { data: PanelMetricData }) => {
  return <div>{data.value}</div>;
};
