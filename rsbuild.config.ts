import { defineConfig } from '@rsbuild/core';
import { DefinePlugin } from '@rspack/core';
import { pluginReact } from '@rsbuild/plugin-react';

export default defineConfig({
  plugins: [pluginReact()],
  html: {
    template: './public/index.html',
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
