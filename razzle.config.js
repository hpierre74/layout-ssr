const { GenerateSW } = require('workbox-webpack-plugin');
const WebpackPwaManifest = require('webpack-pwa-manifest');
const { ReactLoadablePlugin } = require('react-loadable/webpack');

const path = require('path');

module.exports = {
  modify: (config, { target }) =>
    target === 'web'
      ? {
          ...config,
          plugins: [
            ...config.plugins,
            new ReactLoadablePlugin({
              filename: './build/react-loadable.json',
            }),
            new GenerateSW({
              clientsClaim: true,
              skipWaiting: true,
              runtimeCaching: [
                {
                  urlPattern: /images/,
                  handler: 'cacheFirst',
                },
                {
                  urlPattern: new RegExp('^https://fonts.(?:googleapis|gstatic).com/(.*)'),
                  handler: 'cacheFirst',
                },
                {
                  urlPattern: /.*/,
                  handler: 'networkFirst',
                },
              ],
            }),
            new WebpackPwaManifest({
              name: 'Layout System',
              short_name: 'Layout',
              description: 'A CMS for every one',
              theme_color: '#ffffff',
              background_color: '#000000',
              inject: false,
              fingerprints: false,
              icons: [
                {
                  src: path.resolve('public/icon.png'),
                  sizes: [96, 128, 192, 256, 384, 512], // multiple sizes
                },
              ],
            }),
          ],
        }
      : config,
};
