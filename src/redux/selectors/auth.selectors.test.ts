import { RootState } from "../store";

import { getIsAuthenticated, isLoginLoading } from "./auth.selectors";

describe("getIsAuthenticated selector", () => {
  it("should return true when user is authenticated", () => {
    const mockState = {
      authStatus: {
        isAuthenticated: true,
      },
      login: {
        error: null,
        loading: false,
      },
    };

    const result = getIsAuthenticated(mockState as unknown as RootState);
    expect(result).toBe(true);
  });

  it("should return false when user is not authenticated", () => {
    const mockState = {
      authStatus: {
        isAuthenticated: false,
      },
      login: {
        error: null,
        loading: false,
      },
    };

    const result = getIsAuthenticated(mockState as unknown as RootState);
    expect(result).toBe(false);
  });
});

describe("isLoginLoading selector", () => {
  it("should return true when login loading is true", () => {
    const mockState = {
      authStatus: {
        isAuthenticated: true,
      },
      login: {
        error: null,
        loading: true,
      },
    };

    expect(isLoginLoading(mockState as unknown as RootState)).toBe(true);
  });

  it("should return false when login loading is false", () => {
    const mockState = {
      authStatus: {
        isAuthenticated: true,
      },
      login: {
        error: null,
        loading: false,
      },
    };

    expect(isLoginLoading(mockState as unknown as RootState)).toBe(false);
  });
});
