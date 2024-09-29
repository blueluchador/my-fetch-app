import { AuthActionTypes, CHECK_IF_AUTHENTICATED } from "../actions";

import { loginReducer } from "./login.reducer";

describe("loginReducer", () => {
  it("should return the initial state when given an undefined state", () => {
    const action: AuthActionTypes = { type: "UNKNOWN_ACTION" } as unknown as AuthActionTypes;
    const expectedState = {
      isAuthenticated: false,
    };

    expect(loginReducer(undefined, action)).toEqual(expectedState);
  });

  it("should handle CHECK_IF_AUTHENTICATED action", () => {
    const action: AuthActionTypes = {
      isAuthenticated: true,
      type: CHECK_IF_AUTHENTICATED,
    };

    const expectedState = {
      isAuthenticated: true,
    };

    expect(loginReducer(undefined, action)).toEqual(expectedState);
  });

  it("should update the state correctly when authenticated is false", () => {
    const initialState = {
      isAuthenticated: true, // Start with authenticated state
    };

    const action: AuthActionTypes = {
      isAuthenticated: false,
      type: CHECK_IF_AUTHENTICATED,
    };

    const expectedState = {
      isAuthenticated: false,
    };

    expect(loginReducer(initialState, action)).toEqual(expectedState);
  });
});
