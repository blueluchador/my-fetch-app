// Import the necessary dependencies
import { Dog } from "../../models";
import { geDogMatch, getFavoriteDogs } from "../selectors";
import { RootState } from "../store";

describe("Selectors", () => {
  /* eslint-disable sort-keys */
  const initialState: RootState = {
    authStatus: {
      isAuthenticated: null,
    },
    dogBreeds: {
      breeds: [],
      error: null,
      loading: false,
    },
    dogSearch: {
      error: null,
      loading: false,
      search: {
        next: null,
        prev: null,
        total: 0,
      },
    },
    dogs: {
      dogs: [],
      error: null,
      loading: false,
    },
    favorites: {
      dogs: [],
    },
    login: {
      error: null,
      loading: false,
    },
    matchDog: {
      error: null,
      loading: false,
      match: "",
    },
  };
  /* eslint-enable sort-keys */

  describe("getFavoriteDogs", () => {
    it("should return the list of favorite dogs", () => {
      // Mock state
      const mockDogs: Dog[] = [
        { age: 3, breed: "Labrador", id: "1", img: "dog1.jpg", name: "Buddy", zip_code: "12345" },
        { age: 5, breed: "Beagle", id: "2", img: "dog2.jpg", name: "Max", zip_code: "67890" },
      ];

      const mockState: RootState = {
        ...initialState,
        favorites: {
          dogs: mockDogs,
        },
        matchDog: {
          error: null,
          loading: false,
          match: "",
        },
      };

      const result = getFavoriteDogs(mockState);
      expect(result).toEqual(mockDogs);
    });

    it("should return an empty array if no favorite dogs exist", () => {
      const mockState: RootState = {
        ...initialState,
        favorites: {
          dogs: [],
        },
        matchDog: {
          error: null,
          loading: false,
          match: "",
        },
      };

      const result = getFavoriteDogs(mockState);
      expect(result).toEqual([]);
    });
  });

  describe("geDogMatch", () => {
    it("should return the dog's match string", () => {
      const mockState: RootState = {
        ...initialState,
        favorites: {
          dogs: [],
        },
        matchDog: {
          error: null,
          loading: false,
          match: "Perfect Match!",
        },
      };

      const result = geDogMatch(mockState);
      expect(result).toBe("Perfect Match!");
    });

    it("should return an empty string if no match exists", () => {
      const mockState: RootState = {
        ...initialState,
        favorites: {
          dogs: [],
        },
        matchDog: {
          error: null,
          loading: false,
          match: "",
        },
      };

      const result = geDogMatch(mockState);
      expect(result).toBe("");
    });
  });
});
