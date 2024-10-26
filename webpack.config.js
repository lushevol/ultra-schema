const webpack = require('webpack');
const path = require('node:path');

const singleSpaDefaults = require('webpack-config-single-spa-react-ts');
const { merge } = require('webpack-merge');

const orgName = 'fm';
const projectName = 'ratan_cashflow_blotter';
const mode = 'production';
const devtool = 'source-map';
const port = 8005;

module.exports = (webpackConfigEnv, argv) => {
  const defaultConfig = singleSpaDefaults({
    orgName,
    projectName,
    webpackConfigEnv,
    argv,
  });

  return merge(defaultConfig, {
    mode,
    devtool,
    entry: path.resolve(__dirname, 'src', 'mfe'),
    resolve: {
      alias: {
        src: path.resolve(__dirname, 'src'),
      },
      fallback: {
        net: false,
      },
    },
    devServer: {
      port,
    },
    output: {
      filename: `${projectName}.js`,
      // filename: (pathData) => {
      //     if (pathData.chunk.name === "antd") {
      //         return `${projectName}.js`;
      //     }
      //     return `[chunkhash].[name].${projectName}.js`;
      // },
      publicPath: `http://localhost:${port}`,
      chunkFilename: `[chunkhash].[name].${projectName}.js`,
      clean: true,
    },
    // optimization: {
    //     splitChunks: {
    //         chunks: "all",
    //         cachesGroups: {
    //             antd: {
    //                 test: /[\\/]node_modules[\\/](antd|@ant-design|@ant-design-icons)[\\/]/,
    //                 name: "antd",
    //                 priority: 10,
    //                 chunks: "all",
    //             },
    //             vendors: {
    //                 test: /[\\/]node_modules[\\/]/,
    //                 name: "vendors",
    //                 priority: -10,
    //                 chunks: "all",
    //             },
    //         }
    //     },
    // },
    plugins: [
      new webpack.DefinePlugin({
        PUBLIC_URL: '/',
      }),
    ],
  });
};
