import { RootState } from "../store";

import { getDogBreeds } from "./dogs.selectors";

describe("getDogBreeds selector", () => {
  it("should return an array of dog breeds", () => {
    const mockState: RootState = {
      authStatus: {
        isAuthenticated: true,
      },
      dogBreeds: {
        breeds: ["Golden Retriever", "Labrador", "Bulldog"],
        error: null,
        loading: false,
      },
      login: {
        error: null,
        loading: false,
      },
    };

    const result = getDogBreeds(mockState);
    expect(result).toEqual(["Golden Retriever", "Labrador", "Bulldog"]);
  });

  it("should return an empty array when there are no dog breeds", () => {
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

    const result = getDogBreeds(mockState);
    expect(result).toEqual([]);
  });
});
