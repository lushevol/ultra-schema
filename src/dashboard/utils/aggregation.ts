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
  schema: RatanDashboardPanelSchema;
}) => {
  return jexl.eval(params.resultTransform, {
    response: params.response,
    result: params.previousResults,
    schema: params.schema,
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
      return convertPanelMetricsData(data, panel);
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
  schema,
}: {
  result: any[];
  aggregation: string;
  schema: RatanDashboardPanelSchema;
}) => {
  return jexl.eval(aggregation, { result, schema });
};

jexl.addTransform('sortRowsBy', (val, params) => {
  if (Array.isArray(val.rows) && typeof params === 'string') {
    // biome-ignore lint/suspicious/noExplicitAny: <explanation>
    (val.rows as Array<any>).sort(
      (a, b) => Math.abs(b[params]) - Math.abs(a[params]),
    );
    return val;
  }
  return val;
});

jexl.addTransform('firstRows', (val, params) => {
  if (Array.isArray(val.rows) && typeof params === 'number') {
    val.rows = val.rows.slice(0, params);
    return val;
  }
  return val;
});

export { jexl };
