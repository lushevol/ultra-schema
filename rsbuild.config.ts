import { defineConfig } from '@rsbuild/core';
import { pluginNodePolyfill } from '@rsbuild/plugin-node-polyfill';
import { pluginReact } from '@rsbuild/plugin-react';

const LOCAL_SPRING_SERVICE = 'http://localhost:1218';
const LOCAL_SPRING_SUBSCRIPTION_SERVICE = 'ws://localhost:1218';
const MFE_UAT = 'https://fmo-mfe.uk.dev.net:8453';
const SETTLEMENT_GRAPHQL = '/api/ratan/stmcn/v1/cashflows';

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
        target: LOCAL_SPRING_SERVICE,
        secure: false,
      },
      '/dashboard/query/es': {
        target:
          'http://10.4.197.146:5601/api/console/proxy?path=%2F_sql&method=POST',
        pathRewrite: { '^/dashboard/query/es': '' },
        secure: false,
      },
      '/graphql': {
        target: MFE_UAT + SETTLEMENT_GRAPHQL,
        secure: false,
        pathRewrite: { '^/graphql': '' },
      },
      '/subscriptions': {
        target: LOCAL_SPRING_SUBSCRIPTION_SERVICE,
        secure: false,
        ws: true,
      },
      '/api/auth': {
        target: MFE_UAT,
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
