import React from 'react';
import PropTypes from 'prop-types';
import omit from 'lodash/omit';
import classnames from 'classnames';

// Material UI
import Card from '@material-ui/core/Card';
import { makeStyles } from '@material-ui/styles';

// Components
import { Row } from './grid.components';

// utils
import { getTemplate } from '../engine/template.engine';
import Controls from '../modules/admin/cms/forms/controls.component';

const useStyles = makeStyles({
  card: {
    margin: 'auto',
    padding: 0,
  },
  admin: {
    padding: 0,
    border: `1px dashed`,
    borderColor: 'black',
    width: '100%',
    margin: 0,
  },
  topLevel: {
    borderColor: 'red',
  },
});

const ArticleCard = ({ components, sizes, isAdmin, path, id, target, isTopLevel, ...props }) => {
  const classes = useStyles();

  return (
    <Row
      component={Card}
      className={classnames([isAdmin ? classes.admin : classes.card, isTopLevel ? classes.topLevel : ''])}
      {...sizes}
      {...omit(props, ['container', 'justify', 'isTopLevel'])}
    >
      <Controls isAdmin={isAdmin} target={target} id={id} path={path} />
      {components && getTemplate(components, path, isAdmin)}
    </Row>
  );
};

ArticleCard.defaultProps = {
  sizes: { xs: 12, sm: 12, md: 12, lg: 12 },
  isAdmin: false,
  isTopLevel: false,
};

ArticleCard.propTypes = {
  target: PropTypes.string.isRequired,
  isAdmin: PropTypes.bool,
  path: PropTypes.string.isRequired,
  sizes: PropTypes.shape({
    xs: PropTypes.number.isRequired,
    sm: PropTypes.number.isRequired,
    md: PropTypes.number.isRequired,
    lg: PropTypes.number.isRequired,
  }),
  id: PropTypes.string.isRequired,
  components: PropTypes.oneOfType([PropTypes.shape({}), PropTypes.array]).isRequired,
  isTopLevel: PropTypes.bool,
};

export default ArticleCard;
