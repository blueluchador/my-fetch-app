import { AuthActionTypes, CHECK_AUTH } from "../actions";

import { authStatusReducer } from "./authStatus.reducer";

describe("authStatusReducer", () => {
  it("should return the initial state when given an undefined state", () => {
    const action: AuthActionTypes = { type: "UNKNOWN_ACTION" } as unknown as AuthActionTypes;
    const expectedState = {
      isAuthenticated: false,
    };

    expect(authStatusReducer(undefined, action)).toEqual(expectedState);
  });

  it("should handle CHECK_AUTH action", () => {
    const action: AuthActionTypes = {
      isAuthenticated: true,
      type: CHECK_AUTH,
    };

    const expectedState = {
      isAuthenticated: true,
    };

    expect(authStatusReducer(undefined, action)).toEqual(expectedState);
  });

  it("should update the state correctly when authenticated is false", () => {
    const initialState = {
      isAuthenticated: true, // Start with authenticated state
    };

    const action: AuthActionTypes = {
      isAuthenticated: false,
      type: CHECK_AUTH,
    };

    const expectedState = {
      isAuthenticated: false,
    };

    expect(authStatusReducer(initialState, action)).toEqual(expectedState);
  });
});
