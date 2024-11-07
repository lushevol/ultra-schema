import { Table } from 'antd';
import type { PanelTableData } from '../../types/query-and-respond-types';

export const TablePanel = ({ columns, rows }: PanelTableData) => {
  return <Table columns={convertColumns(columns)} dataSource={rows} />;
};

const convertColumns = (columns: string[]) => {
  return columns.map((column) => ({
    title: column,
    dataIndex: column,
  }));
};
