import { Reducer } from "@reduxjs/toolkit"; // Import Reducer type

import { CHECK_IF_AUTHENTICATED, LoginActionTypes } from "../actions";

interface LoginState {
  isAuthenticated: boolean;
}

const initialState: LoginState = {
  isAuthenticated: false,
};

export const loginReducer: Reducer<LoginState, LoginActionTypes> = (
  state = initialState,
  action,
) => {
  switch (action.type) {
    case CHECK_IF_AUTHENTICATED:
      return { ...state, isAuthenticated: action.isAuthenticated };
    default:
      return state;
  }
};
