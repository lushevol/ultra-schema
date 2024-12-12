import { langs } from '@uiw/codemirror-extensions-langs';
import CodeMirror from '@uiw/react-codemirror';
import Ajv from 'ajv';
import addFormats from 'ajv-formats';
import { Button, Col, Row } from 'antd';
import { useState } from 'react';
import userRegisterData from './user-register.json';
import userRegisterSchema from './user-register.schema.json';

const ajv = new Ajv();
addFormats(ajv);

export default function JsonSchemaDemo() {
  const [jsonSchema, setJsonSchema] = useState(
    JSON.stringify(userRegisterSchema, null, 2),
  );
  const [jsonData, setJsonData] = useState(
    JSON.stringify(userRegisterData, null, 2),
  );
  const [isValid, setIsValid] = useState<boolean | null>(null);
  const [errorMessages, setErrorMessages] = useState('');

  const handleValidate = () => {
    console.log(jsonSchema, jsonData);
    const validate = ajv.compile(JSON.parse(jsonSchema));
    const valid = validate(JSON.parse(jsonData));
    console.log(valid);
    console.log(validate.errors);
    setErrorMessages(JSON.stringify(validate.errors, null, 2));
    setIsValid(valid);
  };

  return (
    <div>
      <Row gutter={16}>
        <Col span={12}>
          <h2 className="text-xl font-bold">JSON Schema</h2>
          <CodeMirror
            value={jsonSchema}
            onChange={(value) => setJsonSchema(value)}
            extensions={[langs.json()]}
            height="500px"
            basicSetup={{
              foldGutter: false,
              dropCursor: false,
              allowMultipleSelections: false,
              indentOnInput: false,
            }}
          />
        </Col>
        <Col span={12}>
          <h2 className="text-xl font-bold">JSON Data</h2>
          <CodeMirror
            value={jsonData}
            onChange={(value) => setJsonData(value)}
            extensions={[langs.json()]}
            height="500px"
            basicSetup={{
              foldGutter: false,
              dropCursor: false,
              allowMultipleSelections: false,
              indentOnInput: false,
            }}
          />
        </Col>
      </Row>
      <br />
      <Row>
        <Col span={12}>
          <Button type="primary" onClick={handleValidate}>
            Validate
          </Button>
        </Col>
        <Col span={12}>
          <div className="error-messages">
            {isValid === null ? (
              <div className="text-gray-500">Waiting for validation</div>
            ) : isValid ? (
              <div className="text-green-500">Valid</div>
            ) : (
              <div className="text-red-500">Invalid</div>
            )}
            {!isValid && <pre>{errorMessages}</pre>}
          </div>
        </Col>
      </Row>
    </div>
  );
}
