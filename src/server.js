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
import compression from 'compression';

import App from './App';
import configureStore from './store/configureStore';
import { createTheme, getStoredTheme } from './styles/theme';
import { preloadState } from './store/preloadState';

const server = express();

server
  .disable('x-powered-by')
  .use(compression(path.join(__dirname)))
  .use(express.static(process.env.RAZZLE_PUBLIC_DIR))
  .get('/*', async (req, res) => {
    try {
      const extractor = new ChunkExtractor({
        statsFile: path.resolve('build/loadable-stats.json'),
        entrypoints: ['client'],
      });

      const preloadedState = await preloadState();
      const { store } = configureStore(preloadedState, req.url);
      const finalState = store.getState();

      const sheets = new ServerStyleSheets();

      const markup = renderToString(
        extractor.collectChunks(
          sheets.collect(
            <ChunkExtractorManager extractor={extractor}>
              <ServerLocation url={req.url}>
                <Provider store={store}>
                  <ThemeProvider theme={createTheme(getStoredTheme(finalState))}>
                    <App />
                  </ThemeProvider>
                </Provider>
              </ServerLocation>
            </ChunkExtractorManager>,
          ),
        ),
      );

      const css = sheets.toString();

      res.set('Cache-Control', 'public, max-age=600, s-maxage=1800');

      res.status(200).send(
        oneLineTrim(htmlTemplate`
      <!doctype html>
      <html lang="en">
        <head>
          <meta http-equiv="X-UA-Compatible" content="IE=edge" />
          <meta charSet='utf-8' />
          <title>Layout System</title>
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
    } catch (error) {
      if (process.env.NODE_ENV !== 'production') {
        return res.status(500).send({ error, message: error.message });
      }

      return res.status(500).send(
        oneLineTrim(htmlTemplate`
        <!doctype html>
        <html lang="en">
          <head>
            <meta http-equiv="X-UA-Compatible" content="IE=edge" />
            <meta charSet='utf-8' />
            <title>Layout System</title>
            <meta name="viewport" content="width=device-width, initial-scale=1">
          </head>
          <body>
            <h1>Error Page</h1>
          </body>
        </html>
      `),
      );
    }
  });

export default server;
