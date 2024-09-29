// import { loginReducer } from "./login.reducer";

// export const reducers = {
//     login: loginReducer,
// };

import { combineReducers } from "@reduxjs/toolkit";

import { loginReducer } from "./auth.reducer";

export const reducers = combineReducers({
  login: loginReducer,
});
