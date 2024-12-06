import dayjs from 'dayjs';
import jexl from 'jexl';
import type { SettlementSchemaRootType } from 'src/rtk-query/types.generated';
import type { RatanDashboardPanelSchema } from '../types/dashboard-types';
import type { RatanDashboardPanelDataTypes } from '../types/panel-types';
import { convertPanelTimelineChartData } from './panelLineChartDataConvertor';
import { convertPanelMetricsData } from './panelMetricsDataConvertor';
import { convertPanelPieChartData } from './panelPieDataConvertor';
import {
  type ArrayDataWithHeader,
  convertPanelTableData,
} from './panelTableDataConvertor';

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

/**
 * Return the date string by the workday offset from today
 * @param offset - The offset of the workday
 * @returns The date string
 * @description offset = 0: today, offset > 0: future workday, offset < 0: past workday
 * @example today is Friday, getDateByWorkdayOffset(1) => next Monday
 * @example today is Tuesday, getDateByWorkdayOffset(-2) => last Friday
 */
export const getDateByWorkdayOffset = (offset: number) => {
  let currentDate = dayjs().startOf('day');
  let remainingDays = Math.abs(offset);
  while (remainingDays > 0) {
    currentDate =
      offset > 0 ? currentDate.add(1, 'day') : currentDate.subtract(1, 'day');
    const dayOfWeek = currentDate.day();
    if (![0, 6].includes(dayOfWeek)) {
      remainingDays--;
    }
  }
  return currentDate.format('YYYY-MM-DD');
};

const getVDCategory = (
  paymentDate: string,
  vdToday: string,
  vdTomorrow: string,
  vdDayAfterTomorrow: string,
) => {
  switch (true) {
    case dayjs(paymentDate).isSame(vdToday, 'day'):
      return 'vd_today';
    case dayjs(paymentDate).isSame(vdTomorrow, 'day'):
      return 'vd_tmr';
    case dayjs(paymentDate).isSame(vdDayAfterTomorrow, 'day'):
      return 'vd_2';
    case dayjs(paymentDate).isAfter(vdDayAfterTomorrow, 'day'):
      return 'vd_rest';
    default:
      return null;
  }
};

export const transformCashflowVolumeAndException = (
  results: SettlementSchemaRootType[],
): ArrayDataWithHeader => {
  const vdToday = getDateByWorkdayOffset(0);
  const vdTomorrow = getDateByWorkdayOffset(1);
  const vdDayAfterTomorrow = getDateByWorkdayOffset(2);
  return results.reduce(
    (acc, cur) => {
      const paymentDate = cur.Cashflow?.Payment_Date;
      const exception = cur.Cashflow?.NSTP_Exception;
      if (paymentDate) {
        const vdc = getVDCategory(
          paymentDate,
          vdToday,
          vdTomorrow,
          vdDayAfterTomorrow,
        );
        if (vdc) {
          acc.rows[0][vdc] += 1;
          if (exception) {
            const exceptions = exception.split(';').map((e) => e.trim());
            exceptions.forEach((e) => {
              const row = acc.rows.find((row) => row.label === e);
              if (row) {
                row[vdc] += 1;
              } else {
                acc.rows.push({
                  label: e,
                  vd_rest: 0,
                  vd_today: 0,
                  vd_tmr: 0,
                  vd_2: 0,
                  [vdc]: 1,
                });
              }
            });
          }
        }
      }
      return acc;
    },
    {
      headers: [
        {
          title: '',
          dataIndex: 'label',
          key: 'label',
        },
        {
          title: 'VD Today',
          dataIndex: 'vd_today',
          key: 'vd_today',
        },
        {
          title: 'VD Tomorrow',
          dataIndex: 'vd_tmr',
          key: 'vd_tmr',
        },
        {
          title: 'VD-2',
          dataIndex: 'vd_2',
          key: 'vd_2',
        },
        {
          title: 'VD Rest',
          dataIndex: 'vd_rest',
          key: 'vd_rest',
        },
      ],
      rows: [
        {
          label: 'Cashflow Volume',
          vd_today: 0,
          vd_tmr: 0,
          vd_2: 0,
          vd_rest: 0,
        },
      ],
    },
  );
};

jexl.addTransform(
  'transformCashflowVolumeAndException',
  transformCashflowVolumeAndException,
);
