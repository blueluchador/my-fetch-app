import {
  DogsActionTypes,
  FETCH_DOGS_FAILURE,
  FETCH_DOGS_REQUEST,
  FETCH_DOGS_SUCCESS,
} from "../actions";

import { dogsReducer } from "./dogs.reducer";

describe("dogsReducer", () => {
  it("should return the initial state when given an undefined state", () => {
    const action: DogsActionTypes = { type: "UNKNOWN_ACTION" } as unknown as DogsActionTypes;
    const expectedState = {
      dogs: [],
      error: null,
      loading: false,
    };

    expect(dogsReducer(expectedState, action)).toEqual(expectedState);
  });

  it("should handle FETCH_DOGS_REQUEST action", () => {
    const action: DogsActionTypes = {
      type: FETCH_DOGS_REQUEST,
    };

    const expectedState = {
      dogs: [],
      error: null,
      loading: true,
    };

    expect(dogsReducer(expectedState, action)).toEqual(expectedState);
  });

  it("should handle FETCH_DOGS_SUCCESS action", () => {
    const initialState = {
      dogs: [],
      error: null,
      loading: true,
    };

    const action: DogsActionTypes = {
      payload: [
        {
          age: 3,
          breed: "Bulldog",
          id: "1",
          img: "bulldog.jpg",
          name: "Bulldog",
          zip_code: "90210",
        },
        {
          age: 2,
          breed: "Beagle",
          id: "2",
          img: "beagle.jpg",
          name: "Beagle",
          zip_code: "10001",
        },
      ],
      type: FETCH_DOGS_SUCCESS,
    };

    const expectedState = {
      dogs: [
        {
          age: 3,
          breed: "Bulldog",
          id: "1",
          img: "bulldog.jpg",
          name: "Bulldog",
          zip_code: "90210",
        },
        {
          age: 2,
          breed: "Beagle",
          id: "2",
          img: "beagle.jpg",
          name: "Beagle",
          zip_code: "10001",
        },
      ],
      error: null,
      loading: false,
    };

    expect(dogsReducer(initialState, action)).toEqual(expectedState);
  });

  it("should handle FETCH_DOGS_FAILURE action", () => {
    const initialState = {
      dogs: [],
      error: null,
      loading: true,
    };

    const action: DogsActionTypes = {
      error: "Failed to fetch dogs",
      type: FETCH_DOGS_FAILURE,
    };

    const expectedState = {
      dogs: [],
      error: "Failed to fetch dogs",
      loading: false,
    };

    expect(dogsReducer(initialState, action)).toEqual(expectedState);
  });
});
