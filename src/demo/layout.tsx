import {
  App,
  ConfigProvider,
  Divider,
  Layout,
  Space,
  Switch,
  theme,
} from 'antd';
import { type PropsWithChildren, useState } from 'react';

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
