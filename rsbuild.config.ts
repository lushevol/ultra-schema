import { defineConfig } from '@rsbuild/core';
import { pluginNodePolyfill } from '@rsbuild/plugin-node-polyfill';
import { pluginReact } from '@rsbuild/plugin-react';

export default defineConfig({
  plugins: [pluginReact(), pluginNodePolyfill()],
  html: {
    template: './public/index.html',
  },
  source: {
    define: {
      IS_MOCK: process.env.MOCK === 'true',
    },
  },
  server: {
    proxy: {
      '/opensearch': {
        target: 'https://uklvadapp1344.uk.dev.net:31525',
        pathRewrite: { '^/opensearch': '' },
        secure: false,
      },
      '/dashboard/query/pg/real_time': {
        target: 'http://localhost:931218',
        secure: false,
      },
      '/dashboard/query/es': {
        target:
          'http://10.4.197.146:5601/api/console/proxy?path=%2F_sql&method=POST',
        pathRewrite: { '^/dashboard/query/es': '' },
        secure: false,
      },
    },
  },
  tools: {
    rspack: {
      resolve: {
        fallback: {
          util: require.resolve('util'),
        },
      },
      // plugins: [
      //   new DefinePlugin({
      //     PUBLIC_URL: "/",
      //   }),
      // ]
    },
  },
});
