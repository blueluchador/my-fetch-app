import { RootState } from "../store";

import { getIsAuthenticated } from "./auth.selectors";

describe("getIsAuthenticated selector", () => {
  it("should return true when user is authenticated", () => {
    const mockState: RootState = {
      authStatus: {
        isAuthenticated: true,
      },
      login: {
        error: null,
        loading: false,
      },
    };

    const result = getIsAuthenticated(mockState);
    expect(result).toBe(true);
  });

  it("should return false when user is not authenticated", () => {
    const mockState: RootState = {
      authStatus: {
        isAuthenticated: false,
      },
      login: {
        error: null,
        loading: false,
      },
    };

    const result = getIsAuthenticated(mockState);
    expect(result).toBe(false);
  });
});
