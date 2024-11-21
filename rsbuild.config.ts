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
        target: 'https://uklvadapp1342.uk.dev.net:22099',
        pathRewrite: { '^/opensearch': '' },
        secure: false,
      },
      '/dashboard/query/pg': {
        target: 'http://localhost:1218',
        secure: false,
      },
      '/dashboard/query/es': {
        target:
          'http://10.4.197.146:5601/api/console/proxy?path=%2F_sql&method=POST',
        pathRewrite: { '^/dashboard/query/es': '' },
        secure: false,
      },
      '/graphql': {
        target: 'http://localhost:1218',
        secure: false,
      },
      '/subscriptions': {
        target: 'ws://localhost:1218',
        secure: false,
        ws: true,
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
