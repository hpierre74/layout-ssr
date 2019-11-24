import { combineReducers } from 'redux';
import app from '../modules/app/app.reducer';
import config from '../modules/config/config.reducer';
import lang from '../modules/lang/lang.reducer';
import pageContent from '../modules/pageContentManager/pageContent.reducer';
import counter from '../modules/counter/counter.reducer';

const applyRootReducer = (reducers = {}) =>
  combineReducers({
    app,
    config,
    lang,
    pageContent,
    counter,
    ...reducers,
  });

export default applyRootReducer;
