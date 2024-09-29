import { ThunkAction } from "redux-thunk";

import { loginApi } from "../../api";
import { setUserSession, userSessionExists } from "../../utils";
import {
  AuthActionTypes,
  checkIfAuthenticated,
  loginFailure,
  loginRequest,
  loginSuccess,
} from "../actions";
import { RootState } from "../store";

export const fetchIsAuthenticated = (): ThunkAction<void, RootState, unknown, AuthActionTypes> => {
  return async (dispatch) => {
    const isAuthenticated: boolean = userSessionExists();

    dispatch(checkIfAuthenticated(isAuthenticated));
  };
};

export const login = (
  name: string,
  email: string,
): ThunkAction<void, RootState, unknown, AuthActionTypes> => {
  return async (dispatch) => {
    dispatch(loginRequest());

    try {
      await loginApi(name, email);
      dispatch(loginSuccess());

      // Create user session.
      setUserSession(name);

    } catch (error) {
      dispatch(loginFailure((error as Error).message));
    }
  };
};
