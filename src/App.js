import React, { Fragment } from 'react';
import { Route, Switch } from 'react-router-dom';
import Loadable from 'react-loadable';
import CssBaseline from '@material-ui/core/CssBaseline';

import Layout from './components/Layout';
import NotFound from './pages/NotFound';

import './utils/icons';

const Home = Loadable({
  loader: () => import('./pages/Home'),
  loading: () => null,
});

const About = Loadable({
  loader: () => import('./pages/About'),
  loading: () => null,
});

const CounterApp = Loadable({
  loader: () => import('./modules/counter/counter.connector'),
  loading: () => null,
});

const App = () => (
  <Fragment>
    <CssBaseline />
    <Layout>
      <Switch>
        <Route exact path="/" component={Home} />
        <Route exact path="/about" component={About} />
        <Route exact path="/counter" component={CounterApp} />
        <Route component={NotFound} />
      </Switch>
    </Layout>
  </Fragment>
);

export default App;
