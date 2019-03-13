// Redux
import { applyMiddleware, combineReducers, createStore } from "redux";
import { createLogger } from "redux-logger";
import thunk from "redux-thunk";

// Reducers
import advertisements from "./reducers/advertisementsReducer";
import user from "./reducers/userReducer";

const store = createStore(
  combineReducers({ user, advertisements }),
  applyMiddleware(createLogger(), thunk)
);

export default store;
