import express from 'express';
import React from 'react';
import { Provider } from 'react-redux';
import { renderToString } from 'react-dom/server';
import { StaticRouter } from 'react-router-dom';

import { ServerStyleSheets, ThemeProvider } from '@material-ui/styles';
import serialize from 'serialize-javascript';

import { Capture } from 'react-loadable';
import { getBundles } from 'react-loadable/webpack';
import stats from '../build/react-loadable.json';

import App from './App';
import configureStore from './store/configureStore';
import theme from './utils/theme';

const assets = require(process.env.RAZZLE_ASSETS_MANIFEST);

const server = express();

server
  .disable('x-powered-by')
  .use(express.static(process.env.RAZZLE_PUBLIC_DIR))
  .get('/*', (req, res) => {
    // Compile an initial state
    const preloadedState = { counter: 0 };

    // Create a new Redux store instance
    const store = configureStore(preloadedState);

    const sheets = new ServerStyleSheets();

    const context = {};

    // Render the component to a string
    const modules = [];
    const markup = renderToString(
      sheets.collect(
        <Capture report={moduleName => modules.push(moduleName)}>
          <StaticRouter context={context} location={req.url}>
            <Provider store={store}>
              <ThemeProvider theme={theme}>
                <App />
              </ThemeProvider>
            </Provider>
          </StaticRouter>
        </Capture>,
      ),
    );

    const css = sheets.toString();

    // Grab the initial state from our Redux store
    const finalState = store.getState();

    if (context.url) {
      res.redirect(context.url);
    } else {
      const bundles = getBundles(stats, modules);
      const chunks = bundles.filter(bundle => bundle.file.endsWith('.js'));
      const styles = bundles.filter(bundle => bundle.file.endsWith('.css'));

      res.status(200).send(
        `<!doctype html>
          <html lang="">
            <head>
              <meta http-equiv="X-UA-Compatible" content="IE=edge" />
              <meta charSet='utf-8' />
              <title>Welcome to Razzle</title>
              <meta name="viewport" content="width=device-width, initial-scale=1">
              ${assets.client.css ? `<link rel="stylesheet" href="${assets.client.css}">` : ''}
              ${css ? `<style id='jss-ssr'>${css}</style>` : ''}
              ${styles
                .map(style => {
                  return `<link href="${style.file}" rel="stylesheet"/>`;
                })
                .join('\n')}
            </head>
            <body>
              <div id="root">${markup}</div>
              ${
                process.env.NODE_ENV === 'production'
                  ? `<script src="${assets.client.js}"></script>`
                  : `<script src="${assets.client.js}" crossorigin></script>`
              }
              ${chunks
                .map(chunk =>
                  process.env.NODE_ENV === 'production'
                    ? `<script src="/${chunk.file}"></script>`
                    : `<script src="http://${process.env.HOST}:${parseInt(process.env.PORT, 10) + 1}/${
                        chunk.file
                      }"></script>`,
                )
                .join('\n')}
                <script>
                window.__PRELOADED_STATE__ = ${serialize(finalState)}
              </script>
              <script>window.main();</script>
            </body>
          </html>`,
      );
    }
  });

export default server;
