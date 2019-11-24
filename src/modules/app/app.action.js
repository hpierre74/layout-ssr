export const INIT = 'app/INIT';
export const GET_CONFIG_BEGIN = 'app/GET_CONFIG_BEGIN';
export const GET_CONFIG_SUCCESS = 'app/GET_CONFIG_SUCCESS';
export const GET_CONFIG_FAILURE = 'app/GET_CONFIG_FAILURE';

export const TOGGLE_NAVBAR = 'app/TOGGLE_NAVBAR';

export const toggleNavbar = () => ({ type: TOGGLE_NAVBAR });

export const init = () => dispatch => {
  dispatch({ type: INIT });
};
