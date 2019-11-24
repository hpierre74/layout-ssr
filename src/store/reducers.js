import { combineReducers } from 'redux';
import app from '../modules/app/app.reducer';
import counter from '../modules/counter/counter.reducer';

const applyRootReducer = (reducers = {}) =>
  combineReducers({
    app,
    counter,
    ...reducers,
  });

export default applyRootReducer;
