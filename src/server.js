import path from 'path';
import express from 'express';
import React from 'react';
import { Provider } from 'react-redux';
import { renderToString } from 'react-dom/server';
import { ChunkExtractor, ChunkExtractorManager } from '@loadable/server';
import { ServerLocation } from '@reach/router';
import { html as htmlTemplate, oneLineTrim } from 'common-tags';

import { ServerStyleSheets, ThemeProvider } from '@material-ui/styles';
import serialize from 'serialize-javascript';

import App from './App';
import configureStore from './store/configureStore';
import theme from './utils/theme';

const server = express();

server
  .disable('x-powered-by')
  .use(express.static(process.env.RAZZLE_PUBLIC_DIR))
  .get('/*', (req, res) => {
    const extractor = new ChunkExtractor({
      statsFile: path.resolve('build/loadable-stats.json'),
      entrypoints: ['client'],
    });

    const preloadedState = { counter: 0 };
    const { store } = configureStore(preloadedState, req.url);
    const finalState = store.getState();

    const sheets = new ServerStyleSheets();

    const markup = renderToString(
      extractor.collectChunks(
        sheets.collect(
          <ChunkExtractorManager extractor={extractor}>
            <ServerLocation url={req.url}>
              <Provider store={store}>
                <ThemeProvider theme={theme}>
                  <App />
                </ThemeProvider>
              </Provider>
            </ServerLocation>
          </ChunkExtractorManager>,
        ),
      ),
    );

    const css = sheets.toString();

    res.status(200).send(
      oneLineTrim(htmlTemplate`
      <!doctype html>
      <html lang="">
        <head>
          <meta http-equiv="X-UA-Compatible" content="IE=edge" />
          <meta charSet='utf-8' />
          <title>Welcome to Razzle</title>
          <meta name="viewport" content="width=device-width, initial-scale=1">
          ${extractor.getLinkTags()}
          ${extractor.getStyleTags()}
          ${css ? `<style id='jss-ssr'>${css}</style>` : ''}
        </head>
        <body>
          <div id="root">${markup}</div>
          ${extractor.getScriptTags()}
          <script>
          window.__PRELOADED_STATE__ = ${serialize(finalState)}
        </script>
        </body>
      </html>
    `),
    );
  });

export default server;
