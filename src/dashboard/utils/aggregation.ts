import jexl from 'jexl';
import type { RatanDashboardPanelSchema } from '../types/dashboard-types';
import type { RatanDashboardPanelDataTypes } from '../types/panel-types';
import { convertPanelTimelineChartData } from './panelLineChartDataConvertor';
import { convertPanelMetricsData } from './panelMetricsDataConvertor';
import { convertPanelPieChartData } from './panelPieDataConvertor';
import { convertPanelTableData } from './panelTableDataConvertor';

export const transformResult = (params: {
  response: any;
  resultTransform: string;
  previousResults: any[];
}) => {
  return jexl.eval(params.resultTransform, {
    response: params.response,
    result: params.previousResults,
  });
};

export const panelDataConvertor = (
  panel: RatanDashboardPanelSchema,
  data: any,
): RatanDashboardPanelDataTypes => {
  switch (panel.type) {
    case 'table':
      return convertPanelTableData(data);
    case 'metric':
      return convertPanelMetricsData(data);
    case 'pie':
      return convertPanelPieChartData(data);
    case 'timeline':
      return convertPanelTimelineChartData(data);
    default:
      return null;
  }
};

export const aggregationResult = ({
  result,
  aggregation,
}: { result: any[]; aggregation: string }) => {
  return jexl.eval(aggregation, { result });
};
