import Form from '@rjsf/antd';
import validator from '@rjsf/validator-ajv8';
import { Button, Divider, Drawer } from 'antd';
import type { JSONSchema7 } from 'json-schema';
import { useState } from 'react';
import type { RatanDashboardSchema } from 'src/dashboard/types/dashboard-types';
import { useAppDispatch, useAppSelector } from 'src/store';
import { setDashboardSchema } from 'src/store/slices/dashboard';
import dashboardSchemaJSONSchema from '../../schema/dashboard.schema.json';

export const SchemaEditor = () => {
  const schema = useAppSelector((state) => state.dashboard.schema);
  const dispath = useAppDispatch();
  const [open, setOpen] = useState(false);
  return (
    <>
      <Button type="primary" onClick={() => setOpen(true)}>
        Open Schema Editor
      </Button>
      <Drawer
        title="Dashboard Schema Editor"
        width={800}
        onClose={() => setOpen(false)}
        open={open}
      >
        <Button
          onClick={() => {
            dispath(
              setDashboardSchema(
                JSON.parse(JSON.stringify(schema)) as RatanDashboardSchema,
              ),
            );
          }}
        >
          Refresh
        </Button>
        <Divider />
        <Form
          schema={dashboardSchemaJSONSchema as JSONSchema7}
          formData={schema}
          onSubmit={(formData) => {
            dispath(
              setDashboardSchema(formData.formData as RatanDashboardSchema),
            );
          }}
          autoComplete="off"
          noHtml5Validate
          formContext={{
            descriptionLocation: 'tooltip',
            readonlyAsDisabled: false,
          }}
          validator={validator}
        />
      </Drawer>
    </>
  );
};
