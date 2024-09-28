import { RootState } from "../store";

import { getIsAuthenticated } from "./login.selectors";

describe("getIsAuthenticated selector", () => {
  it("should return true when user is authenticated", () => {
    const mockState: RootState = {
      login: {
        isAuthenticated: true,
      },
    };

    const result = getIsAuthenticated(mockState);
    expect(result).toBe(true);
  });

  it("should return false when user is not authenticated", () => {
    const mockState: RootState = {
      login: {
        isAuthenticated: false,
      },
    };

    const result = getIsAuthenticated(mockState);
    expect(result).toBe(false);
  });
});
