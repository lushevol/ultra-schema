import { Button, Form, Input } from 'antd';
import { useLocation, useNavigate } from 'react-router-dom';
import { useMFESession } from '../hooks/useMFESession';

type FieldType = {
  username: string;
  password: string;
};

export const Login = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const { login } = useMFESession();

  const onFinish = async (values: FieldType) => {
    await login(values);
    const from = location.state?.from?.pathname || '/';
    navigate(from, { replace: true });
  };

  return (
    <Form
      name="login-form"
      labelCol={{ span: 8 }}
      wrapperCol={{ span: 16 }}
      style={{ maxWidth: 600 }}
      initialValues={{ remember: true }}
      onFinish={onFinish}
    >
      <Form.Item<FieldType>
        label="Username"
        name="username"
        rules={[{ required: true, message: 'Please input your username!' }]}
      >
        <Input />
      </Form.Item>

      <Form.Item<FieldType>
        label="Password"
        name="password"
        rules={[{ required: true, message: 'Please input your password!' }]}
      >
        <Input.Password />
      </Form.Item>

      <Form.Item label={null}>
        <Button type="primary" htmlType="submit">
          Submit
        </Button>
      </Form.Item>
    </Form>
  );
};
