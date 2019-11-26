import React from 'react';
import { push } from 'redux-first-history';
import loadable from '@loadable/component';

import Client from '../pages/client/client.connector';

export const renderClientsRoutes = ({ pages, modules }) =>
  Object.values(pages).map(page => {
    const { component, target, path, name } = page;
    const isHome = component === 'Home';
    const isPageEnabled = modules[target].enabled || isHome;

    return isPageEnabled ? <Client key={path} name={name} path={path} default={isHome} /> : null;
  });

export const renderAdminRoutes = ({ pages }) =>
  Object.values(pages).map(page => {
    const { target, path, name, enabled } = page;
    const Component = enabled ? importAdminRoute(target) : null;

    return enabled ? <Component key={path} name={name} path={path} /> : null;
  });

export const importPageRoute = () => loadable(() => import(`../engine/template.engine`));

export const importAdminRoute = target => loadable(() => import(`../modules/admin/${target}/${target}.connector`));

export const navigate = destination => dispatch => dispatch(push(destination));

export const pathToTarget = path => (path === '/' ? 'home' : path.replace(/\//gi, ''));
export const targetToPath = target => (target === 'home' ? '/' : `/${target}`);
export const getPathname = ({
  router: {
    location: { pathname },
  },
}) => pathname;
