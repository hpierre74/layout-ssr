import React from 'react';
import PropTypes from 'prop-types';

import BookIcon from '@material-ui/icons/Book';
import FoodIcon from '@material-ui/icons/Restaurant';
import ContactIcon from '@material-ui/icons/Info';
import HomeIcon from '@material-ui/icons/Home';
import MenuIcon from '@material-ui/icons/LibraryBooks';

const iconVariants = {
  home: HomeIcon,
  book: BookIcon,
  food: FoodIcon,
  contact: ContactIcon,
  menu: MenuIcon,
  styleguide: MenuIcon,
};

const NavIcon = props => {
  const Icon = iconVariants[props.name];

  return <Icon color={props.dark ? 'primary' : 'secondary'} />;
};

NavIcon.propTypes = { name: PropTypes.string.isRequired, dark: PropTypes.bool };
export default NavIcon;
