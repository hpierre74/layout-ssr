import React, { Fragment } from 'react';
import { Route, Switch } from 'react-router-dom';
import CssBaseline from '@material-ui/core/CssBaseline';
import Layout from './components/Layout';
import Home from './pages/Home';
import About from './pages/About';
import NotFound from './pages/NotFound';
import CounterApp from './modules/counter/counter.connector';

import './utils/icons';

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
