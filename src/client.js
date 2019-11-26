import React from 'react';
import { hydrate } from 'react-dom';
import { Provider } from 'react-redux';
import { loadableReady } from '@loadable/component';
import { LocationProvider } from '@reach/router';

import { ThemeProvider } from '@material-ui/styles';

import configureStore from './store/configureStore';

import App from './App';
import { init } from './modules/app/app.action';
import { createTheme, getStoredTheme } from './styles/theme';

const root = document.getElementById('root');
const { store, history } = configureStore(window.__PRELOADED_STATE__);
const theme = createTheme(getStoredTheme(store.getState()));

store.dispatch(init());

loadableReady(() => {
  hydrate(
    <Provider store={store}>
      <ThemeProvider theme={theme}>
        <LocationProvider history={history}>
          <App />
        </LocationProvider>
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
