import type {
  ExceptionCodeStatistics,
  ResultNew,
} from 'src/rtk-query/types.generated';
import { jexl } from '../utils/aggregation';
import type { ArrayDataWithHeader } from '../utils/panelTableDataConvertor';

const getVDCategory = (
  index: number,
): 'vd_today' | 'vd_tmr' | 'vd_2' | 'vd_rest' => {
  switch (index) {
    case 0:
      return 'vd_today';
    case 1:
      return 'vd_tmr';
    case 2:
      return 'vd_2';
    default:
      return 'vd_rest';
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
      acc.rows[0][getVDCategory(index)] = cur;
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

export const transformCashflowExceptionStatistics = (
  results: Array<Array<ExceptionCodeStatistics>>,
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
      cur.forEach(({ exceptionCode, count }) => {
        const row = acc.rows.find((row) => row.label === exceptionCode);
        if (row) {
          row[getVDCategory(index)] = count;
        } else {
          acc.rows.push({
            label: exceptionCode,
            vd_rest: 0,
            vd_today: 0,
            vd_tmr: 0,
            vd_2: 0,
            [getVDCategory(index)]: count,
          });
        }
      });
      return acc;
    },
    {
      headers: CashflowVolumeAndExceptionTableHeader,
      rows: [],
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

jexl.addTransform('transformCashflowVolume', transformCashflowVolume);
jexl.addTransform(
  'transformCashflowExceptionStatistics',
  transformCashflowExceptionStatistics,
);
jexl.addTransform('transformTopExposure', transformTopExposure);
