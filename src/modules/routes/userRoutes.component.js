import React from 'react';
import PropTypes from 'prop-types';
import { Router } from '@reach/router';
import { renderClientsRoutes } from '../../utils/routing.utils';

const UserRoutes = ({ modules, pages }) => <Router>{renderClientsRoutes({ pages, modules })}</Router>;

UserRoutes.propTypes = {
  initialized: PropTypes.bool.isRequired,
  modules: PropTypes.shape({}).isRequired,
  pages: PropTypes.shape({}).isRequired,
};

export default UserRoutes;
