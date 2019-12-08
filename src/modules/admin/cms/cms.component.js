import React from 'react';
import PropTypes from 'prop-types';

import { makeStyles } from '@material-ui/styles';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';

import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';

import { Row, Col } from '../../../lib/grid.components';
import SelectTemplateElement from './forms/parent.connector';
import { getTemplate } from '../../../engine/template.engine';
import { Switch } from '@material-ui/core';

const useStyles = makeStyles({
  container: {
    width: '95%',
    margin: '0 2.5%',
  },
  card: {
    minHeight: '300px',
  },
  content: {
    width: '100%',
  },
});

const onSubmit = setPage => e => {
  e.preventDefault();

  return setPage();
};

const CMS = props => {
  const classes = useStyles();

  try {
    const { components, setPage, showControls, toggleControls } = props;

    const handleClick = onSubmit(setPage);
    return (
      <Row className={classes.container}>
        <Col xs={12} md={12} sm={12} lg={12}>
          <Card className={classes.card}>
            <CardHeader title="Page" />
            <CardContent className={classes.content}>
              <Row>
                <Col xs={12} md={12} sm={12} lg={12}>
                  <FormGroup row>
                    <FormControlLabel
                      control={
                        <Switch
                          checked={showControls}
                          onChange={toggleControls}
                          value="showControls"
                          inputProps={{ 'aria-label': 'secondary checkbox' }}
                        ></Switch>
                      }
                      label="Show Controls"
                    />
                  </FormGroup>
                </Col>
                <Col>{components && getTemplate(components, '', true, true)}</Col>
              </Row>
            </CardContent>
          </Card>
        </Col>
        <Col xs={12} md={12} sm={12}>
          <SelectTemplateElement />
        </Col>
        <Col xs={12} md={12} sm={12}>
          <Button onClick={handleClick}>SUBMIT</Button>
        </Col>
      </Row>
    );
  } catch (error) {
    /* eslint-disable no-console */
    console.log('cms error', error);
    return null;
  }
};

CMS.defaultProps = { components: null, showControls: false };

CMS.propTypes = {
  components: PropTypes.oneOfType([PropTypes.shape({}), PropTypes.array]),
  setChildElement: PropTypes.func.isRequired,
  setParentElement: PropTypes.func.isRequired,
  showControls: PropTypes.bool,
  toggleControls: PropTypes.func.isRequired,
};

export default CMS;
