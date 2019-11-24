/* eslint-disable prefer-object-spread */
const path = require('path');
const LoadableWebpackPlugin = require('@loadable/webpack-plugin');
const LoadableBabelPlugin = require('@loadable/babel-plugin');
const babelPresetRazzle = require('razzle/babel');
const CompressionPlugin = require('compression-webpack-plugin');
const BrotliPlugin = require('brotli-webpack-plugin');

module.exports = {
  modify: (config, { dev, target }) => {
    const appConfig = Object.assign({}, config);

    if (target === 'web') {
      const filename = path.resolve(__dirname, 'build');

      appConfig.plugins = [
        ...appConfig.plugins,
        new LoadableWebpackPlugin({
          outputAsset: false,
          writeToDisk: { filename },
        }),
      ];

      appConfig.output.filename = dev ? 'static/js/[name].js' : 'static/js/[name].[chunkhash:8].js';

      appConfig.node = { fs: 'empty' }; // fix "Cannot find module 'fs'" problem.

      appConfig.optimization = Object.assign({}, appConfig.optimization, {
        runtimeChunk: true,
        splitChunks: {
          chunks: 'all',
          name: dev,
        },
      });
    }

    appConfig.plugins = [
      ...appConfig.plugins,
      new CompressionPlugin({
        filename: '[path].gz[query]',
        algorithm: 'gzip',
        test: /\.js$|\.css$|\.html$/,
        threshold: 10240,
        minRatio: 0.8,
        cache: true,
      }),
      new BrotliPlugin({
        asset: '[path].br[query]',
        test: /\.js$|\.css$|\.html$/,
        threshold: 10240,
        minRatio: 0.8,
      }),
    ];

    return appConfig;
  },

  modifyBabelOptions: () => ({
    babelrc: false,
    presets: [babelPresetRazzle],
    plugins: [LoadableBabelPlugin],
  }),
};
