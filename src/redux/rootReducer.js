import { combineReducers } from "redux";
import todoReducer from "./reducers";

const rootReducer = combineReducers({
  todos: todoReducer,
})

export default rootReducer;