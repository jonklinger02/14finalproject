import { combineReducers } from "redux";
import articles from "./articles_reducer";
import users from "./users_reducer";
import site from "./site_reducer";
import notification from "./notification_reducer";

const appReducers = combineReducers({
  articles,
  users,
  site,
  notification,
});

export default appReducers;
