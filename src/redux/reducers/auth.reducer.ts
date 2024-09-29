import { Reducer } from "@reduxjs/toolkit"; // Import Reducer type

import {
  AuthActionTypes,
  CHECK_IF_AUTHENTICATED,
  LOGIN_FAILURE,
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
} from "../actions";

interface LoginState {
  isAuthenticated: boolean;
}

const initialLoginState: LoginState = {
  isAuthenticated: false,
};

export const loginReducer: Reducer<LoginState, AuthActionTypes> = (
  state = initialLoginState,
  action,
) => {
  switch (action.type) {
    case CHECK_IF_AUTHENTICATED:
      return { ...state, isAuthenticated: action.isAuthenticated };
    default:
      return state;
  }
};

interface AuthState {
  loading: boolean;
  error: string | null;
}

const initialAuthState: AuthState = {
  error: null,
  loading: false,
};

export const authReducer: Reducer<AuthState, AuthActionTypes> = (
  state = initialAuthState,
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
