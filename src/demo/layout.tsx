import {
  App,
  Avatar,
  ConfigProvider,
  Divider,
  Dropdown,
  Layout,
  Menu,
  Space,
  Switch,
  Typography,
  theme,
} from 'antd';
import { type PropsWithChildren, useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';
import { useMFESession } from 'src/authentication/hooks/useMFESession';

const items = [
  {
    label: <NavLink to="/rjsf-demo">SSI Form</NavLink>,
    key: 'rjsf-demo',
  },
  {
    label: <NavLink to="/dashboard-demo">Dashboard</NavLink>,
    key: 'dashboard-demo',
  },
  {
    label: <NavLink to="/blotter-query-demo">Query Builder</NavLink>,
    key: 'blotter-query-demo',
  },
  {
    label: <NavLink to="/generic-config-demo">Generic Config</NavLink>,
    key: 'generic-config-demo',
  },
  {
    label: <NavLink to="/track-using-demo">Track Using</NavLink>,
    key: 'track-using-demo',
  },
];

const nonLoginMenuItems = [
  {
    label: <NavLink to="/login">Login</NavLink>,
    key: 'login',
  },
];

const userMenuItems = [
  {
    label: 'Logout',
    key: 'logout',
  },
];

export const DemoLayout = ({ children }: PropsWithChildren) => {
  const { login, userInfo } = useMFESession();
  useEffect(() => {
    login({
      username: 'admin',
      password: 'admin',
    });
  }, [login]);
  const [themeIsDark, setThemeIsDark] = useState(false);
  return (
    <ConfigProvider
      theme={{
        algorithm: themeIsDark ? theme.darkAlgorithm : theme.defaultAlgorithm,
      }}
    >
      <App>
        <Layout style={{ minHeight: '100vh' }}>
          <Layout.Header style={{ display: 'flex', alignItems: 'center' }}>
            <Typography.Title style={{ color: 'white', margin: 0 }}>
              Shuai's POC
            </Typography.Title>
            <Menu
              mode="horizontal"
              theme="dark"
              items={items}
              selectedKeys={[location.pathname.substring(1)]}
            />
            <Space>
              <Switch
                checkedChildren="Dark"
                unCheckedChildren="Light"
                checked={themeIsDark}
                onChange={setThemeIsDark}
              />
              <div className="user-info">
                <Dropdown
                  menu={{
                    items: userInfo.userId ? userMenuItems : nonLoginMenuItems,
                  }}
                >
                  <Avatar style={{ backgroundColor: '#87d068' }}>
                    {userInfo.fullName ?? 'UNKNOWN'}
                  </Avatar>
                </Dropdown>
              </div>
            </Space>
          </Layout.Header>
          <Layout.Content style={{ padding: 12 }}>{children}</Layout.Content>
        </Layout>
      </App>
    </ConfigProvider>
  );
};
