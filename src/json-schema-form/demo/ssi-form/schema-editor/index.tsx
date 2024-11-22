import Form from '@rjsf/antd';
import validator from '@rjsf/validator-ajv8';
import { Button, Drawer, Input } from 'antd';
import type { JSONSchema7 } from 'json-schema';
import { useState } from 'react';
import { useAppDispatch, useAppSelector } from 'src/store';
import { setJsonSchemaFormSchema } from 'src/store/slices/json-schema-form';

export const SchemaEditor = () => {
  const schema = useAppSelector((state) => state.jsonSchemaForm.schema);
  const [schemaText, setSchemaText] = useState(JSON.stringify(schema, null, 2));
  const dispath = useAppDispatch();
  const [open, setOpen] = useState(false);
  return (
    <>
      <Button onClick={() => setOpen(true)}>Open Schema Editor</Button>
      <Drawer
        title="SSI Form Schema Editor"
        width={800}
        onClose={() => setOpen(false)}
        open={open}
      >
        <Input.TextArea
          value={schemaText}
          onChange={(e) => setSchemaText(e.target.value)}
          rows={50}
        />
        <Button
          type="primary"
          onClick={() => {
            const parsedSchema = JSON.parse(schemaText);
            dispath(setJsonSchemaFormSchema(parsedSchema as JSONSchema7));
          }}
        >
          Save
        </Button>
      </Drawer>
    </>
  );
};
