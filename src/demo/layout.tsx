import {
  ConfigProvider,
  theme,
  App,
  Divider,
  Space,
  Switch,
  Layout,
} from 'antd';
import { useState, type PropsWithChildren } from 'react';

export const DemoLayout = ({ children }: PropsWithChildren) => {
  const [themeIsDark, setThemeIsDark] = useState(false);
  return (
    <ConfigProvider
      theme={{
        algorithm: themeIsDark ? theme.darkAlgorithm : theme.defaultAlgorithm,
      }}
    >
      <App>
        <Layout>
          <Layout.Header>
            <Space>
              <Switch
                checkedChildren="Dark"
                unCheckedChildren="Light"
                checked={themeIsDark}
                onChange={setThemeIsDark}
              />
            </Space>
          </Layout.Header>
          <Layout.Content>{children}</Layout.Content>
        </Layout>
      </App>
    </ConfigProvider>
  );
};
