import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import { createReduxHistoryContext, reachify } from 'redux-first-history';
import { createMemoryHistory, createBrowserHistory } from 'history';

import pageContentMiddleware from '../middlewares/pageContent.middleware';
import applyRootReducer from './reducers';

const createHistory = pathname =>
  typeof window === 'undefined' ? createMemoryHistory({ initialEntries: [pathname] }) : createBrowserHistory();

const composeEnhancers =
  typeof window !== 'undefined' && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ && process.env.NODE_ENV === 'development'
    ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
    : compose;

const configureStore = (preloadedState, pathname) => {
  const { createReduxHistory, routerMiddleware, routerReducer } = createReduxHistoryContext({
    history: createHistory(pathname),
  });

  const store = createStore(
    applyRootReducer({ router: routerReducer }),
    preloadedState,
    composeEnhancers(applyMiddleware(thunk, routerMiddleware, pageContentMiddleware)),
  );

  if (module.hot) {
    // Enable Webpack hot module replacement for reducers
    module.hot.accept('./reducers', () => {
      const nextRootReducer = require('./reducers').default;
      store.replaceReducer(nextRootReducer);
    });
  }

  const history = createReduxHistory(store);
  const reachHistory = reachify(history);

  return { store, history: reachHistory };
};

export default configureStore;
