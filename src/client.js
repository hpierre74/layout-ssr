import React from 'react';
import { hydrate } from 'react-dom';
import { Provider } from 'react-redux';
import { loadableReady } from '@loadable/component';

import { ThemeProvider } from '@material-ui/styles';

import theme from './utils/theme';
import configureStore from './store/configureStore';

import App from './App';

const root = document.getElementById('root');
const store = configureStore(window.__PRELOADED_STATE__);

loadableReady(() => {
  hydrate(
    <Provider store={store}>
      <ThemeProvider theme={theme}>
        <App />
      </ThemeProvider>
    </Provider>,
    root,
    () => {
      const jssStyles = document.getElementById('jss-ssr');
      if (jssStyles && jssStyles.parentNode) jssStyles.parentNode.removeChild(jssStyles);
    },
  );
});

if (module.hot) {
  module.hot.accept();
}
