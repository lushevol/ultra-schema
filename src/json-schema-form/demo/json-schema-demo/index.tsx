import { langs } from '@uiw/codemirror-extensions-langs';
import CodeMirror from '@uiw/react-codemirror';
import { Button, Col, Row } from 'antd';
import { useState } from 'react';
import ajv from 'src/json-schema-form/utils/ajv';
import userRegisterData from './user-register.json';
import userRegisterSchema from './user-register.schema.json';

export default function JsonSchemaDemo() {
  const [jsonSchema, setJsonSchema] = useState(
    JSON.stringify(userRegisterSchema, null, 2),
  );
  const [jsonData, setJsonData] = useState(
    JSON.stringify(userRegisterData, null, 2),
  );
  const [isValid, setIsValid] = useState<boolean | null>(null);
  const [isValidFromBE, setIsValidFromBE] = useState<boolean | null>(null);
  const [errorMessages, setErrorMessages] = useState('');
  const [errorMessagesFromBE, setErrorMessagesFromBE] = useState('');

  const handleValidate = () => {
    const validate = ajv.compile(JSON.parse(jsonSchema));
    const valid = validate(JSON.parse(jsonData));
    setErrorMessages(
      JSON.stringify(
        validate.errors?.map((error) => ({
          field: error.instancePath,
          message: error.message,
        })),
        null,
        2,
      ),
    );
    setIsValid(valid);
  };

  const handleValidateFromBE = async () => {
    const response = await fetch('/api/json-schema/validate', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ jsonSchema: jsonSchema, jsonData: jsonData }),
    });
    const data = await response.json();
    setIsValidFromBE(data.valid);
    setErrorMessagesFromBE(
      JSON.stringify(
        data.messages?.map((message: { message: string }) => message.message),
        null,
        2,
      ),
    );
  };

  return (
    <div className="p-4">
      <Row gutter={16} className="mb-6">
        <Col span={12}>
          <h2 className="text-xl font-bold mb-3">JSON Schema</h2>
          <CodeMirror
            value={jsonSchema}
            onChange={(value) => setJsonSchema(value)}
            extensions={[langs.json()]}
            height="500px"
            className="border rounded-lg shadow-sm"
          />
        </Col>
        <Col span={12}>
          <div className="space-y-6">
            <div>
              <h2 className="text-xl font-bold mb-3">JSON Data</h2>
              <CodeMirror
                value={jsonData}
                onChange={(value) => setJsonData(value)}
                extensions={[langs.json()]}
                height="200px"
                className="border rounded-lg shadow-sm"
              />
            </div>
            {isValid !== null && (
              <div className="bg-gray-50 p-4 rounded-lg">
                <h2 className="text-xl font-bold mb-3">Validation Result</h2>
                {isValid ? (
                  <div className="text-green-500 font-semibold">Valid</div>
                ) : (
                  <div className="text-red-500 font-semibold">Invalid</div>
                )}
                {!isValid && (
                  <pre className="mt-2 p-3 bg-gray-100 rounded overflow-auto max-h-40">
                    {errorMessages}
                  </pre>
                )}
              </div>
            )}
            {isValidFromBE !== null && (
              <div className="bg-gray-50 p-4 rounded-lg">
                <h2 className="text-xl font-bold mb-3">
                  Validation Result From BE
                </h2>
                {isValidFromBE ? (
                  <div className="text-green-500 font-semibold">Valid</div>
                ) : (
                  <div className="text-red-500 font-semibold">Invalid</div>
                )}
                {!isValidFromBE && (
                  <pre className="mt-2 p-3 bg-gray-100 rounded overflow-auto max-h-40">
                    {errorMessagesFromBE}
                  </pre>
                )}
              </div>
            )}
          </div>
        </Col>
      </Row>
      <Row gutter={16}>
        <Col>
          <Button
            type="primary"
            onClick={handleValidate}
            className="px-6 py-2 shadow-sm hover:shadow-md transition-shadow"
          >
            Validate
          </Button>
        </Col>
        <Col>
          <Button
            onClick={handleValidateFromBE}
            className="px-6 py-2 shadow-sm hover:shadow-md transition-shadow"
          >
            Validate From BE
          </Button>
        </Col>
      </Row>
    </div>
  );
}
