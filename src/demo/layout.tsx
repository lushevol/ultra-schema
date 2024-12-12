import {
  App,
  Avatar,
  ConfigProvider,
  Dropdown,
  Flex,
  Layout,
  Menu,
  Space,
  Switch,
  theme,
} from 'antd';
import { type PropsWithChildren, useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { useMFESession } from 'src/authentication/hooks/useMFESession';
import './main.css';

const items = [
  {
    label: <NavLink to="/json-schema-demo">JSON Schema</NavLink>,
    key: 'json-schema-demo',
  },
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
  const navigate = useNavigate();
  const { userInfo, logout } = useMFESession();
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
            <Flex
              align="center"
              justify="space-between"
              style={{ width: '100%' }}
            >
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
                      items: userInfo.userId
                        ? userMenuItems
                        : nonLoginMenuItems,
                      onClick: ({ key }) => {
                        if (key === 'logout') {
                          logout();
                        } else if (key === 'login') {
                          navigate('/login');
                        }
                      },
                    }}
                  >
                    <Avatar style={{ backgroundColor: '#87d068' }}>
                      {userInfo.fullName ?? 'UNKNOWN'}
                    </Avatar>
                  </Dropdown>
                </div>
              </Space>
            </Flex>
          </Layout.Header>
          <Layout.Content style={{ padding: 12 }}>{children}</Layout.Content>
        </Layout>
      </App>
    </ConfigProvider>
  );
};
