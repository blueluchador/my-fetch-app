import { CHECK_IF_AUTHENTICATED, checkIfAuthenticated } from "./login.actions";

describe("checkIfAuthenticated action creator", () => {
  it("should create an action to check if the user is authenticated", () => {
    const isAuthenticated = true;

    const expectedAction = {
      isAuthenticated,
      type: CHECK_IF_AUTHENTICATED,
    };

    const action = checkIfAuthenticated(isAuthenticated);

    expect(action).toEqual(expectedAction);
  });

  it("should set isAuthenticated to false", () => {
    const isAuthenticated = false;

    const expectedAction = {
      isAuthenticated,
      type: CHECK_IF_AUTHENTICATED,
    };

    const action = checkIfAuthenticated(isAuthenticated);

    expect(action).toEqual(expectedAction);
  });
});
