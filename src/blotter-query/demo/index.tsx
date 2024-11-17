import { Space } from 'antd';
import { AgGridWithSchema } from './cashflow-data-grid';
import { MyQueryBuilder } from './query-builder';

export default function BlotterQueryDemo() {
  return (
    <Space direction="vertical" style={{ width: '100%' }}>
      <MyQueryBuilder />
      <AgGridWithSchema />
    </Space>
  );
}
