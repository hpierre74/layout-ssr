import { LOCATION_CHANGE, push } from 'redux-first-history';
import { isAuth } from '../modules/auth/auth.selectors';

export default store => next => action => {
  switch (action.type) {
    case LOCATION_CHANGE: {
      if (action.payload.location.pathname.includes('admin')) {
        const state = store.getState();

        if (!isAuth(state)) {
          store.dispatch(push('/error'));
        }
      }
      break;
    }

    default:
  }

  next(action);
};
