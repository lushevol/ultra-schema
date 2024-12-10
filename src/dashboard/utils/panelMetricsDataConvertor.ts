import type { RatanDashboardPanelSchema } from '../types/dashboard-types';
import type { PanelMetricData } from '../types/panel-types';

export const convertPanelMetricsData = (
  data: string | number | boolean | null,
  schema: RatanDashboardPanelSchema,
): PanelMetricData => {
  let value = '-';
  try {
    value = data?.toString() ?? 'null';
  } catch (error) {
    console.error(error);
  }
  const { unit, subTitle } = schema;
  return {
    value,
    unit,
    subTitle,
  };
};
