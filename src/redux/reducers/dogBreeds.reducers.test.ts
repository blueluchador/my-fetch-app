import {
  DogsActionTypes,
  FETCH_DOG_BREEDS_REQUEST,
  FETCH_DOG_BREEDS_SUCCESS,
  FETCH_DOGS_FAILURE,
} from "../actions/dogs.actions";

import { dogBreedsReducer } from "./dogBreeds.reducer";

describe("dogBreedsReducer", () => {
  it("should return the initial state when given an undefined state", () => {
    const action: DogsActionTypes = { type: "UNKNOWN_ACTION" } as unknown as DogsActionTypes;
    const expectedState = {
      breeds: [],
      error: null,
      loading: false,
    };

    expect(dogBreedsReducer(expectedState, action)).toEqual(expectedState);
  });

  it("should handle FETCH_DOG_BREEDS_REQUEST action", () => {
    const action: DogsActionTypes = {
      type: FETCH_DOG_BREEDS_REQUEST,
    };

    const expectedState = {
      breeds: [],
      error: null,
      loading: true,
    };

    expect(dogBreedsReducer(expectedState, action)).toEqual(expectedState);
  });

  it("should handle FETCH_DOG_BREEDS_SUCCESS action", () => {
    const initialState = {
      breeds: [],
      error: null,
      loading: true,
    };

    const action: DogsActionTypes = {
      payload: ["Golden Retriever", "Labrador"],
      type: FETCH_DOG_BREEDS_SUCCESS,
    };

    const expectedState = {
      breeds: ["Golden Retriever", "Labrador"],
      error: null,
      loading: false,
    };

    expect(dogBreedsReducer(initialState, action)).toEqual(expectedState);
  });

  it("should handle FETCH_DOGS_FAILURE action", () => {
    const initialState = {
      breeds: [],
      error: null,
      loading: true,
    };

    const action: DogsActionTypes = {
      error: "Failed to fetch breeds",
      type: FETCH_DOGS_FAILURE,
    };

    const expectedState = {
      breeds: [],
      error: "Failed to fetch breeds",
      loading: false,
    };

    expect(dogBreedsReducer(initialState, action)).toEqual(expectedState);
  });
});
