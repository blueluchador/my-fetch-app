import { CHECK_IF_AUTHENTICATED, LoginActionTypes } from "../actions";

import { loginReducer } from "./login.reducer";

describe("loginReducer", () => {
  it("should return the initial state when given an undefined state", () => {
    const action: LoginActionTypes = { type: "UNKNOWN_ACTION" } as unknown as LoginActionTypes; // Use type assertion for an unknown action
    const expectedState = {
      isAuthenticated: false,
    };

    expect(loginReducer(undefined, action)).toEqual(expectedState);
  });

  it("should handle CHECK_IF_AUTHENTICATED action", () => {
    const action: LoginActionTypes = {
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

    const action: LoginActionTypes = {
      isAuthenticated: false,
      type: CHECK_IF_AUTHENTICATED,
    };

    const expectedState = {
      isAuthenticated: false,
    };

    expect(loginReducer(initialState, action)).toEqual(expectedState);
  });
});
