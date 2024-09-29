import {
  CHECK_AUTH,
  checkIfAuthenticated,
  LOGIN_FAILURE,
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
  loginFailure,
  loginRequest,
  loginSuccess,
} from "./auth.actions";

describe("checkIfAuthenticated action creator", () => {
  it("should create an action to check if the user is authenticated", () => {
    const isAuthenticated = true;

    const expectedAction = {
      isAuthenticated,
      type: CHECK_AUTH,
    };

    const action = checkIfAuthenticated(isAuthenticated);

    expect(action).toEqual(expectedAction);
  });

  it("should set isAuthenticated to false", () => {
    const isAuthenticated = false;

    const expectedAction = {
      isAuthenticated,
      type: CHECK_AUTH,
    };

    const action = checkIfAuthenticated(isAuthenticated);

    expect(action).toEqual(expectedAction);
  });
});

describe("Auth Actions", () => {
  it("should create an action to request login", () => {
    const expectedAction = { type: LOGIN_REQUEST };
    expect(loginRequest()).toEqual(expectedAction);
  });

  it("should create an action for successful login", () => {
    const expectedAction = { type: LOGIN_SUCCESS };
    expect(loginSuccess()).toEqual(expectedAction);
  });

  it("should create an action for failed login with an error message", () => {
    const error = "Login failed";
    const expectedAction = {
      payload: error,
      type: LOGIN_FAILURE,
    };
    expect(loginFailure(error)).toEqual(expectedAction);
  });
});
