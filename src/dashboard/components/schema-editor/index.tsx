import Form from '@rjsf/antd';
import validator from '@rjsf/validator-ajv8';
import { Button, Drawer } from 'antd';
import type { JSONSchema7 } from 'json-schema';
import { useState } from 'react';
import { useAppDispatch, useAppSelector } from 'src/store';
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
        <Form
          schema={dashboardSchemaJSONSchema as JSONSchema7}
          formData={schema}
          onSubmit={(formData) => {
            dispath({ type: 'dashboard/setSchema', payload: formData });
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