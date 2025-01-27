import dayjs from 'dayjs';
import type { ResultNew } from 'src/rtk-query/types.generated';
import { jexl } from '../utils/aggregation';
import type { ArrayDataWithHeader } from '../utils/panelTableDataConvertor';
import { getDateByWorkdayOffset } from '../utils/utils';

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

const CashflowVolumeAndExceptionTableHeader = [
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
];

type CashflowVolumeAndExceptionTableRowType = {
  label: string;
  vd_today: number;
  vd_tmr: number;
  vd_2: number;
  vd_rest: number;
};

export const transformCashflowVolume = (
  results: number[],
): ArrayDataWithHeader<CashflowVolumeAndExceptionTableRowType> => {
  if (!Array.isArray(results))
    return {
      headers: CashflowVolumeAndExceptionTableHeader,
      rows: [],
    };

  return results.reduce<
    ArrayDataWithHeader<CashflowVolumeAndExceptionTableRowType>
  >(
    (acc, cur, index) => {
      switch (index) {
        case 0:
          acc.rows[0].vd_today = cur;
          break;
        case 1:
          acc.rows[0].vd_tmr = cur;
          break;
        case 2:
          acc.rows[0].vd_2 = cur;
          break;
        case 3:
          acc.rows[0].vd_rest = cur;
          break;

        default:
          break;
      }
      return acc;
    },
    {
      headers: CashflowVolumeAndExceptionTableHeader,
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

export const transformCashflowVolumeAndException = (
  results: ResultNew[],
): ArrayDataWithHeader<CashflowVolumeAndExceptionTableRowType> => {
  if (!Array.isArray(results))
    return {
      headers: CashflowVolumeAndExceptionTableHeader,
      rows: [],
    };
  const vdToday = getDateByWorkdayOffset(0);
  const vdTomorrow = getDateByWorkdayOffset(1);
  const vdDayAfterTomorrow = getDateByWorkdayOffset(2);
  return results.reduce<
    ArrayDataWithHeader<CashflowVolumeAndExceptionTableRowType>
  >(
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
      headers: CashflowVolumeAndExceptionTableHeader,
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

const TopExposureTableHeader = [
  {
    title: 'Counterparty',
    dataIndex: 'counterpartyFMCODE',
    key: 'counterpartyFMCODE',
  },
  {
    title: 'Type',
    dataIndex: 'clientType',
    key: 'clientType',
  },
  {
    title: 'Amount',
    dataIndex: 'amount',
    key: 'amount',
  },
];
type TopExposureTableRowType = {
  counterpartyFMCODE: string;
  clientType: string;
  amount: number;
};

// placeholder for USD rate
const USD_RATE = 1;

const transformTopExposure = (
  results: ResultNew[],
): ArrayDataWithHeader<TopExposureTableRowType> => {
  if (!Array.isArray(results))
    return {
      headers: TopExposureTableHeader,
      rows: [],
    };
  return results.reduce<ArrayDataWithHeader<TopExposureTableRowType>>(
    (acc, cur) => {
      const counterpartyFMCODE = cur.Entity?.Counterparty_SCI_FMCODE ?? '';
      if (!counterpartyFMCODE) return acc;
      const clientType = cur.Entity?.Counterparty_Client_Type ?? '';
      const amount = Number(cur.Cashflow?.Payment_Amount ?? '0');
      const pr = cur.Cashflow?.Pay_Receive_Indicator;

      const calculatedAmount = Math.round(
        amount *
          USD_RATE *
          (pr?.toLowerCase() === 'pay'
            ? -1
            : pr?.toLowerCase() === 'receive'
              ? 1
              : 0),
      );

      const target = acc.rows.find(
        (r) =>
          r.counterpartyFMCODE === counterpartyFMCODE &&
          r.clientType === clientType,
      );
      if (target) {
        target.amount += calculatedAmount;
      } else {
        acc.rows.push({
          counterpartyFMCODE,
          clientType,
          amount: calculatedAmount,
        });
      }
      return acc;
    },
    {
      headers: TopExposureTableHeader,
      rows: [],
    },
  );
};

jexl.addTransform(
  'transformCashflowVolumeAndException',
  transformCashflowVolumeAndException,
);

jexl.addTransform('transformTopExposure', transformTopExposure);
