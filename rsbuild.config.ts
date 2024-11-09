import { defineConfig } from '@rsbuild/core';
import { pluginReact } from '@rsbuild/plugin-react';

export default defineConfig({
  plugins: [pluginReact()],
  html: {
    template: './public/index.html',
  },
  server: {
    proxy: {
      '/opensearch': {
        target: 'https://uklvadapp1344.uk.dev.net:31525',
        pathRewrite: { '^/opensearch': '' },
        secure: false,
      },
      '/dashboard/query/pg': {
        target: 'http://localhost:8080',
        secure: false,
      },
      '/dashboard/query/es': {
        target: 'http://10.4.197.146:5601/api/console/proxy?path=%2F_sql&method=POST',
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
