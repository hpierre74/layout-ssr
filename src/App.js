import React, { Fragment } from 'react';
import { Router } from '@reach/router';
import loadable from '@loadable/component';
import CssBaseline from '@material-ui/core/CssBaseline';

// import Layout from './components/Layout';
import NavBar from './modules/navbar/navbar.connector';

import Admin from './pages/admin/admin.component';
import UserRoutes from './modules/routes/userRoutes.connector';

const Toaster = loadable(() => import('./modules/toaster/toast.connector'));
// const Home = loadable(() => import('./pages/Home'));
// const About = loadable(() => import('./pages/About'));

// const App = () => (
//   <Fragment>
//     <CssBaseline />
//     <Layout>
//       <Router>
//         <Home exact path="/" />
//         <About exact path="/about" />
//       </Router>
//     </Layout>
//   </Fragment>
// );

// export default App;

const App = () => (
  <Fragment>
    <CssBaseline />
    <NavBar desktop={true}>
      <UserRoutes />
      <Toaster />
    </NavBar>
    <Router>
      <Admin path="/admin/" />
    </Router>
  </Fragment>
);

// App.propTypes = {
//   theme: PropTypes.shape({
//     navbar: PropTypes.shape({
//       desktop: PropTypes.bool,
//     }),
//   }).isRequired,
// };

export default App;
