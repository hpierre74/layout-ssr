import { combineReducers } from 'redux';
import app from '../modules/app/app.reducer';
import config from '../modules/config/config.reducer';
import admin from '../modules/admin/admin.reducer';
import toaster from '../modules/toaster/toaster.reducer';
import cms from '../modules/admin/cms/cms.reducer';
import pageContent from '../modules/pageContentManager/pageContent.reducer';
import lang from '../modules/lang/lang.reducer';

const applyRootReducer = (reducers = {}) =>
  combineReducers({
    app,
    config,
    lang,
    pageContent,
    admin,
    toaster,
    cms,
    ...reducers,
  });

export default applyRootReducer;
