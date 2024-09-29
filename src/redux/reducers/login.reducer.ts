import { Reducer } from "@reduxjs/toolkit";

import { AuthActionTypes, LOGIN_FAILURE, LOGIN_REQUEST, LOGIN_SUCCESS } from "../actions";

interface LoginState {
  loading: boolean;
  error: string | null;
}

const initialState: LoginState = {
  error: null,
  loading: false,
};

export const loginReducer: Reducer<LoginState, AuthActionTypes> = (
  state = initialState,
  action,
) => {
  switch (action.type) {
    case LOGIN_REQUEST:
      return {
        ...state,
        error: null,
        loading: true,
      };
    case LOGIN_SUCCESS:
      return {
        ...state,
        error: null,
        loading: false,
      };
    case LOGIN_FAILURE:
      return {
        ...state,
        error: action.payload,
        loading: false,
      };
    default:
      return state;
  }
};
