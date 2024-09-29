import { combineReducers } from "@reduxjs/toolkit";

import { authStatusReducer } from "./authStatus.reducer";
import { loginReducer } from "./login.reducer";

export const reducers = combineReducers({
  authStatus: authStatusReducer,
  login: loginReducer,
});
