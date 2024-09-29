import { Reducer } from "@reduxjs/toolkit"; // Import Reducer type

import { AuthActionTypes, CHECK_AUTH } from "../actions";

interface AuthStatusState {
  isAuthenticated: boolean;
}

const initialState: AuthStatusState = {
  isAuthenticated: false,
};

export const authStatusReducer: Reducer<AuthStatusState, AuthActionTypes> = (
  state = initialState,
  action,
) => {
  switch (action.type) {
    case CHECK_AUTH:
      return { ...state, isAuthenticated: action.isAuthenticated };
    default:
      return state;
  }
};
