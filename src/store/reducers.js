import { combineReducers } from "redux";
import app from "../modules/app/app.reducer";
import counter from "../modules/counter/counter.reducer";

const rootReducer = combineReducers({
  app,
  counter
});

export default rootReducer;
