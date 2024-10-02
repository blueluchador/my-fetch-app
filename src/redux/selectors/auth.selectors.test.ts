import { RootState } from "../store";

import { getIsAuthenticated, isLoginLoading } from "./auth.selectors";

describe("getIsAuthenticated selector", () => {
  it("should return true when user is authenticated", () => {
    const mockState: RootState = {
      authStatus: {
        isAuthenticated: true,
      },
      dogBreeds: {
        breeds: [],
        error: null,
        loading: false,
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
      dogBreeds: {
        breeds: [],
        error: null,
        loading: false,
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

describe("isLoginLoading selector", () => {
  it("should return true when login loading is true", () => {
    const mockState: RootState = {
      authStatus: {
        isAuthenticated: true,
      },
      dogBreeds: {
        breeds: [],
        error: null,
        loading: false,
      },
      login: {
        error: null,
        loading: true,
      },
    };

    expect(isLoginLoading(mockState)).toBe(true);
  });

  it("should return false when login loading is false", () => {
    const mockState: RootState = {
      authStatus: {
        isAuthenticated: true,
      },
      dogBreeds: {
        breeds: [],
        error: null,
        loading: false,
      },
      login: {
        error: null,
        loading: false,
      },
    };

    expect(isLoginLoading(mockState)).toBe(false);
  });
});
