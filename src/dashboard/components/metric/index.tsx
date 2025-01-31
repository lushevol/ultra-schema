import { Statistic } from 'antd';
import { usePanelClick } from 'src/dashboard/hooks/usePanel';
import type {
  PanelMetricData,
  RatanDashboardPanel,
} from 'src/dashboard/types/panel-types';

export const MetricPanel = ({
  data,
  schema,
}: { data: PanelMetricData; schema: RatanDashboardPanel }) => {
  const { onPanelClick } = usePanelClick();
  return (
    <div>
      <div className="metric-sub-title">{data.subTitle}</div>
      <button
        className="metric-value"
        type="button"
        onClick={() => onPanelClick(schema, { position: 'metric-value' })}
        style={{
          padding: 0,
          margin: 0,
          border: 'none',
          background: 'none',
        }}
      >
        <span className="metric-value-content">{data.value}</span>
        <span className="metric-unit">{getSuffix(data.unit)}</span>
      </button>
    </div>
  );
};

const getSuffix = (unit?: PanelMetricData['unit']) => {
  switch (unit) {
    case 'percentage':
      return '%';
    case 'amount':
      return '';
    default:
      return '';
  }
};
