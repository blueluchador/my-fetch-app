import { combineReducers } from "@reduxjs/toolkit";

import { authStatusReducer } from "./authStatus.reducer";
import { dogBreedsReducer } from "./dogBreeds.reducer";
import { loginReducer } from "./login.reducer";

export const reducers = combineReducers({
  authStatus: authStatusReducer,
  dogBreeds: dogBreedsReducer,
  login: loginReducer,
});
