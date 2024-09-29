
import { combineReducers } from "@reduxjs/toolkit";

import { authReducer, loginReducer } from "./auth.reducer";

export const reducers = combineReducers({
  auth: authReducer,
  login: loginReducer,
});
