import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import omit from 'lodash/omit';
import classnames from 'classnames';

import { isAuth } from '../modules/auth/auth.selectors';
import { getTemplate } from '../engine/template.engine';

import { Row } from './grid.components';
import Controls from '../modules/admin/cms/forms/controls.component';
import { makeStyles } from '@material-ui/styles';

const useStyles = makeStyles({
  default: {},
  admin: {
    padding: 0,
    border: '1px dashed black',
    width: '100%',
    margin: 0,
  },
  topLevel: {
    borderColor: 'red',
  },
});

const Section = ({ spacing, justify, components, isAdmin, path, id, target, isTopLevel, ...props }) => {
  const classes = useStyles();

  return (
    <Row
      className={classnames([isAdmin ? classes.admin : classes.default, isTopLevel ? classes.topLevel : ''])}
      {...omit(props, ['isAdmin', 'dispatch', 'sizes', 'isTopLevel'])}
      spacing={spacing}
      justify={justify}
    >
      <Controls isAdmin={isAdmin} target={target} id={id} path={path} />
      {components && getTemplate(components, path, isAdmin)}
    </Row>
  );
};

Section.defaultProps = {
  spacing: 4,
  justify: 'center',
  isTopLevel: false,
};

Section.propTypes = {
  target: PropTypes.string.isRequired,
  path: PropTypes.string,
  isAdmin: PropTypes.bool.isRequired,
  spacing: PropTypes.number,
  justify: PropTypes.string,
  id: PropTypes.string.isRequired,
  components: PropTypes.oneOfType([PropTypes.shape({}), PropTypes.array]).isRequired,
  isTopLevel: PropTypes.bool,
};

export default connect(state => ({ isAdmin: isAuth(state) }))(Section);
