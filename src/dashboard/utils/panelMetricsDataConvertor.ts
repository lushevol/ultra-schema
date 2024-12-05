import type { RatanDashboardPanelSchema } from '../types/dashboard-types';
import type { PanelMetricData } from '../types/panel-types';

export const convertPanelMetricsData = (
  data: string | number | boolean,
  schema: RatanDashboardPanelSchema,
): PanelMetricData => {
  const { unit, subTitle } = schema;
  return {
    value: data.toString(),
    unit,
    subTitle,
  };
};
