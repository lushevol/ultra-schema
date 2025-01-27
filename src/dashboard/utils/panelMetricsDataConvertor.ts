import type { BasicType } from '../types/base-types';
import type { RatanDashboardPanelSchema } from '../types/dashboard-types';
import type { PanelMetricData } from '../types/panel-types';

export const convertPanelMetricsData = (
  data: BasicType,
  schema: RatanDashboardPanelSchema,
): PanelMetricData => {
  let value = '-';
  try {
    value = data?.toString() ?? '-';
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
