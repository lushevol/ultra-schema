import { Table } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import type { PanelTableData } from 'src/dashboard/types/panel-types';

export const TablePanel = ({ columns, rows }: PanelTableData) => {
  return (
    <Table
      columns={columns}
      dataSource={rows}
      pagination={false}
      size="small"
    />
  );
};
