import { Table } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import type { PanelTableData } from 'src/dashboard/types/panel-types';

export const TablePanel = ({ columns, rows }: PanelTableData) => {
  return (
    <Table
      columns={convertColumns(columns)}
      dataSource={rows}
      scroll={{ x: 500 }}
      pagination={false}
    />
  );
};

const convertColumns = (columns: string[]): ColumnsType => {
  return columns.map((column) => ({
    title: column,
    dataIndex: column,
    key: column,
  }));
};
