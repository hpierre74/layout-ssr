import React from 'react';
import PropTypes from 'prop-types';
import loadable from '@loadable/component';

import shortid from 'shortid';

// eslint-disable-next-line no-console
console.log('REMOVE SHORTID GENERATE BEFORE MEP');

// const replaceInDev = (prod, dev) => (process.env.NODE_ENV === 'production' ? prod : dev);

export const getComponent = (index, component, path, isAdmin) => {
  const Component = loadable(() => import(/* webpackChunkName: "Template" */ `../lib/${component.target}.template`));

  return <Component key={`${component.id || shortid.generate()}`} path={path} isAdmin={isAdmin} {...component} />;
};

export const getTemplate = (components, path, isAdmin) => {
  return components
    ? Object.values(components).map((component, index) => getComponent(index, component, path, isAdmin))
    : null;
};
//replaceInDev(path, shortid.generate())
export default function Layout({ content }) {
  return getTemplate(content);
}

Layout.defaultProps = {
  content: null,
};

Layout.propTypes = {
  content: PropTypes.shape({}),
};
