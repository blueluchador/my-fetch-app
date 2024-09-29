import { AuthActionTypes, LOGIN_FAILURE, LOGIN_REQUEST, LOGIN_SUCCESS } from "../actions";

import { loginReducer } from "./login.reducer";

describe("loginReducer", () => {
  it("should return the initial state when given an undefined state", () => {
    const action: AuthActionTypes = { type: "UNKNOWN_ACTION" } as unknown as AuthActionTypes;
    const expectedState = {
      error: null,
      loading: false,
    };

    expect(loginReducer(undefined, action)).toEqual(expectedState);
  });

  it("should handle LOGIN_REQUEST action", () => {
    const action: AuthActionTypes = {
      type: LOGIN_REQUEST,
    };

    const expectedState = {
      error: null,
      loading: true,
    };

    expect(loginReducer(undefined, action)).toEqual(expectedState);
  });

  it("should handle LOGIN_SUCCESS action", () => {
    const initialState = {
      error: "Some error",
      loading: true,
    };

    const action: AuthActionTypes = {
      type: LOGIN_SUCCESS,
    };

    const expectedState = {
      error: null,
      loading: false,
    };

    expect(loginReducer(initialState, action)).toEqual(expectedState);
  });

  it("should handle LOGIN_FAILURE action", () => {
    const initialState = {
      error: null,
      loading: true,
    };

    const action: AuthActionTypes = {
      payload: "Invalid credentials",
      type: LOGIN_FAILURE,
    };

    const expectedState = {
      error: "Invalid credentials",
      loading: false,
    };

    expect(loginReducer(initialState, action)).toEqual(expectedState);
  });
});
