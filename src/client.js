import React from "react";
import { hydrate } from "react-dom";
import { Provider } from "react-redux";
import { ThemeProvider } from "@material-ui/styles";
import { BrowserRouter } from "react-router-dom";

import theme from "./utils/theme";
import configureStore from "./store/configureStore";

import App from "./App";

const store = configureStore(window.__PRELOADED_STATE__);

hydrate(
  <Provider store={store}>
    <ThemeProvider theme={theme}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </ThemeProvider>
  </Provider>,
  document.getElementById("root"),
  () => {
    const jssStyles = document.getElementById("jss-ssr");
    if (jssStyles && jssStyles.parentNode)
      jssStyles.parentNode.removeChild(jssStyles);
  }
);

if (module.hot) {
  module.hot.accept("./App", () => {
    hydrate(
      <Provider store={store}>
        <ThemeProvider theme={theme}>
          <BrowserRouter>
            <App />
          </BrowserRouter>
        </ThemeProvider>
      </Provider>,
      document.getElementById("root"),
      () => {
        const jssStyles = document.getElementById("jss-ssr");
        if (jssStyles && jssStyles.parentNode)
          jssStyles.parentNode.removeChild(jssStyles);
      }
    );
  });
}
