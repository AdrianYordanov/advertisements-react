import { applyMiddleware, combineReducers, createStore } from "redux";
import { createLogger } from "redux-logger";
import thunk from "redux-thunk";
import user from "./user/reducer";
import advertisements from "./advertisements/reducer";

export default createStore(
  combineReducers({ user, advertisements }),
  applyMiddleware(createLogger(), thunk)
);
