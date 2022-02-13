import { createStore, applyMiddleware, compose } from "redux";
import thunk from "redux-thunk";

import appReducers from "./reducers";

const ReduxStore = () => {
  const composeEnchancers =
    window.__REDUX_DEVTOOLS_EXTENTION_COMPOSE__ || compose;

  const store = createStore(
    appReducers,
    composeEnchancers(applyMiddleware(thunk))
  );

  return store;
};

export default ReduxStore;
