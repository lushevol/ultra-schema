import { CloseOutlined } from '@ant-design/icons';
import { Button, Card, Form, Input, Select, Space } from 'antd';
import { useState } from 'react';
import type { RatanDashboardSchema } from 'src/dashboard/types/dashboard-types';
import { useAppDispatch } from 'src/store';
import { setDashboardGlobalFilters } from 'src/store/slices/dashboard';

export const GlobalFilters = ({
  filters,
}: { filters: RatanDashboardSchema['globalFilters'] }) => {
  const [editable, setEditable] = useState(false);
  const dispath = useAppDispatch();
  const [form] = Form.useForm();
  return (
    <div>
      <Form
        form={form}
        autoComplete="off"
        initialValues={{ filters }}
        onFinish={(values: {
          filters: RatanDashboardSchema['globalFilters'];
        }) => {
          dispath(setDashboardGlobalFilters(values.filters));
        }}
      >
        <Form.List name="filters">
          {(fields, { add, remove }) => (
            <Space>
              {fields.map((field, index) =>
                editable ? (
                  <Card
                    size="small"
                    key={field.key}
                    extra={
                      <CloseOutlined
                        onClick={() => {
                          remove(field.name);
                        }}
                      />
                    }
                  >
                    <Form.Item
                      label="Business Domain"
                      name={[field.name, 'domain']}
                    >
                      <Select
                        mode="tags"
                        placeholder="Select business domain"
                        options={[
                          {
                            value: 'SettlementCashflowBlotter',
                            label: 'Settlement Cashflow Blotter',
                          },
                          {
                            value: 'SettlementGroupBlotter',
                            label: 'Settlement Group Blotter',
                          },
                        ]}
                      />
                    </Form.Item>
                    <Form.Item
                      label="Field"
                      name={[field.name, 'filter', 'field']}
                    >
                      <Input placeholder="Enter field" />
                    </Form.Item>
                    <Form.Item
                      label="Operator"
                      name={[field.name, 'filter', 'operator']}
                    >
                      <Select
                        placeholder="Select an operator"
                        options={[
                          { value: 'IN', label: 'IN' },
                          { value: 'NOTIN', label: 'NOTIN' },
                          { value: 'EQ', label: 'EQ' },
                          { value: 'NE', label: 'NE' },
                          { value: 'GT', label: 'GT' },
                          { value: 'LT', label: 'LT' },
                        ]}
                      />
                    </Form.Item>
                    <Form.Item
                      label="Values"
                      name={[field.name, 'filter', 'values']}
                    >
                      <Select mode="tags" placeholder="Enter values" />
                    </Form.Item>
                  </Card>
                ) : (
                  <Space
                    key={field.key}
                    align="center"
                    style={{ margin: '8px 0px' }}
                  >
                    <span>{filters[index].filter.field}</span>
                    {/* <span>{filters[index].filter.operator}</span> */}
                    <span>:</span>
                    <Form.Item
                      name={[field.name, 'filter', 'values']}
                      style={{ margin: 0 }}
                    >
                      <Select
                        mode="tags"
                        placeholder="Enter values"
                        style={{ width: '200px' }}
                      />
                    </Form.Item>
                  </Space>
                ),
              )}

              <Space className="operations">
                <Button type="primary" htmlType="submit" block>
                  Update
                </Button>
                <Button
                  onClick={() => {
                    setEditable(!editable);
                  }}
                  block
                >
                  {editable ? 'Cancel Edit' : 'Edit'}
                </Button>
                {editable && (
                  <Button type="dashed" onClick={() => add()} block>
                    + Add Filter
                  </Button>
                )}
              </Space>
            </Space>
          )}
        </Form.List>
      </Form>
    </div>
  );
};
