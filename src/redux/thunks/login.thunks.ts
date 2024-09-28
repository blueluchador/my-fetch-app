import { ThunkAction } from "redux-thunk";

import { userSessionExists } from "../../utils";
import { checkIfAuthenticated, LoginActionTypes } from "../actions";
import { RootState } from "../store";

export const fetchIsAuthenticated = (): ThunkAction<void, RootState, unknown, LoginActionTypes> => {
  return async (dispatch) => {
    const isAuthenticated: boolean = userSessionExists();

    dispatch(checkIfAuthenticated(isAuthenticated));
  };
};
