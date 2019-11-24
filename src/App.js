import React, { Fragment } from 'react';
import { Router } from '@reach/router';
import loadable from '@loadable/component';
import CssBaseline from '@material-ui/core/CssBaseline';

import Layout from './components/Layout';

const Home = loadable(() => import('./pages/Home'));
const About = loadable(() => import('./pages/About'));

const App = () => (
  <Fragment>
    <CssBaseline />
    <Layout>
      <Router>
        <Home exact path="/" />
        <About exact path="/about" />
      </Router>
    </Layout>
  </Fragment>
);

export default App;
