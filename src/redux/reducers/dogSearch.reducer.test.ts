import {
  DogsActionTypes,
  SEARCH_DOGS_FAILURE,
  SEARCH_DOGS_REQUEST,
  SEARCH_DOGS_SUCCESS,
} from "../actions";

import { dogSearchReducer } from "./dogSearch.reducers";

describe("dogSearchReducer", () => {
  it("should return the initial state when given an undefined state", () => {
    const action: DogsActionTypes = { type: "UNKNOWN_ACTION" } as unknown as DogsActionTypes;
    const expectedState = {
      error: null,
      loading: false,
      search: {
        next: null,
        prev: null,
        size: 0,
      },
    };

    expect(dogSearchReducer(expectedState, action)).toEqual(expectedState);
  });

  it("should handle SEARCH_DOGS_REQUEST action", () => {
    const action: DogsActionTypes = {
      type: SEARCH_DOGS_REQUEST,
    };

    const expectedState = {
      error: null,
      loading: true,
      search: {
        next: null,
        prev: null,
        size: 0,
      },
    };

    expect(dogSearchReducer(expectedState, action)).toEqual(expectedState);
  });

  it("should handle SEARCH_DOGS_SUCCESS action", () => {
    const initialState = {
      error: null,
      loading: true,
      search: {
        next: null,
        prev: null,
        size: 0,
      },
    };

    const action: DogsActionTypes = {
      payload: {
        next: "next-page",
        prev: "prev-page",
        resultIds: [],
        size: 50,
      },
      type: SEARCH_DOGS_SUCCESS,
    };

    const expectedState = {
      error: null,
      loading: false,
      search: {
        next: "next-page",
        prev: "prev-page",
        size: 50,
      },
    };

    expect(dogSearchReducer(initialState, action)).toEqual(expectedState);
  });

  it("should handle SEARCH_DOGS_FAILURE action", () => {
    const initialState = {
      error: null,
      loading: true,
      search: {
        next: null,
        prev: null,
        size: 0,
      },
    };

    const action: DogsActionTypes = {
      error: "Failed to fetch dogs",
      type: SEARCH_DOGS_FAILURE,
    };

    const expectedState = {
      error: "Failed to fetch dogs",
      loading: false,
      search: {
        next: null,
        prev: null,
        size: 0,
      },
    };

    expect(dogSearchReducer(initialState, action)).toEqual(expectedState);
  });
});
