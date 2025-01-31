import { Table } from 'antd';
import type {
  PanelTableData,
  RatanDashboardPanel,
} from 'src/dashboard/types/panel-types';

export const TablePanel = ({
  columns,
  rows,
  schema,
}: PanelTableData & { schema: RatanDashboardPanel }) => {
  return (
    <Table
      columns={columns}
      dataSource={rows}
      pagination={false}
      size="small"
    />
  );
};
