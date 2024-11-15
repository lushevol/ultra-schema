import { Space } from 'antd';
import { MyQueryBuilder } from 'src/query-builder/demo';
import { AgGridWithSchema } from './cashflow-data-grid';

export default function BlotterQueryDemo() {
  return (
    <Space direction="vertical" style={{ width: '100%' }}>
      <MyQueryBuilder />
      <AgGridWithSchema />
    </Space>
  );
}
