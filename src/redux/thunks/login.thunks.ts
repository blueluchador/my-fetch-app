import { ThunkAction } from "redux-thunk";

import { userSessionExists } from "../../utils";
import { AuthActionTypes, checkIfAuthenticated } from "../actions";
import { RootState } from "../store";

export const fetchIsAuthenticated = (): ThunkAction<void, RootState, unknown, AuthActionTypes> => {
  return async (dispatch) => {
    const isAuthenticated: boolean = userSessionExists();

    dispatch(checkIfAuthenticated(isAuthenticated));
  };
};
