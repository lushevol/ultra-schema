import { Table } from 'antd';
import type { PanelTableData } from 'src/dashboard/types/panel-types';

export const TablePanel = ({ columns, rows }: PanelTableData) => {
  return (
    <Table
      columns={convertColumns(columns)}
      dataSource={rows}
      scroll={{ x: 500 }}
      style={{ width: '200px' }}
    />
  );
};

const convertColumns = (columns: string[]) => {
  return columns.map((column) => ({
    title: column,
    dataIndex: column,
  }));
};
