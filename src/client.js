import React from 'react';
import { hydrate } from 'react-dom';
import { Provider } from 'react-redux';
import Loadable from 'react-loadable';
import { ThemeProvider } from '@material-ui/styles';
import { BrowserRouter } from 'react-router-dom';

import theme from './utils/theme';
import configureStore from './store/configureStore';

import App from './App';

window.main = () => {
  render(App);
};

const root = document.getElementById('root');
const store = configureStore(window.__PRELOADED_STATE__);

if (module.hot) {
  module.hot.accept('./App', () => {
    const NewApp = require('./App').default;
    render(NewApp);
  });
}

function render(Root) {
  Loadable.preloadReady().then(() => {
    hydrate(
      <Provider store={store}>
        <ThemeProvider theme={theme}>
          <BrowserRouter>
            <Root />
          </BrowserRouter>
        </ThemeProvider>
      </Provider>,
      root,
      () => {
        const jssStyles = document.getElementById('jss-ssr');
        if (jssStyles && jssStyles.parentNode) jssStyles.parentNode.removeChild(jssStyles);
      },
    );
  });
}
