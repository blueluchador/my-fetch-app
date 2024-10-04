import {
  MATCH_DOG_FAILURE,
  MATCH_DOG_REQUEST,
  MATCH_DOG_SUCCESS,
  MatchDogActionTypes,
} from "../actions";

import { matchDogReducer } from "./matchDog.reducer";

describe("matchDogReducer", () => {
  it("should return the initial state when given an undefined state", () => {
    const action: MatchDogActionTypes = {
      type: "UNKNOWN_ACTION",
    } as unknown as MatchDogActionTypes;
    const expectedState = {
      error: null,
      loading: false,
      match: "",
    };

    expect(matchDogReducer(expectedState, action)).toEqual(expectedState);
  });

  it("should handle MATCH_DOG_REQUEST action", () => {
    const action: MatchDogActionTypes = {
      type: MATCH_DOG_REQUEST,
    };

    const expectedState = {
      error: null,
      loading: true,
      match: "",
    };

    expect(matchDogReducer(expectedState, action)).toEqual(expectedState);
  });

  it("should handle MATCH_DOG_SUCCESS action", () => {
    const initialState = {
      error: null,
      loading: true,
      match: "",
    };

    const action: MatchDogActionTypes = {
      payload: { match: "Golden Retriever" },
      type: MATCH_DOG_SUCCESS,
    };

    const expectedState = {
      error: null,
      loading: false,
      match: "Golden Retriever",
    };

    expect(matchDogReducer(initialState, action)).toEqual(expectedState);
  });

  it("should handle MATCH_DOG_FAILURE action", () => {
    const initialState = {
      error: null,
      loading: true,
      match: "",
    };

    const action: MatchDogActionTypes = {
      error: "Failed to match dog",
      type: MATCH_DOG_FAILURE,
    };

    const expectedState = {
      error: "Failed to match dog",
      loading: false,
      match: "",
    };

    expect(matchDogReducer(initialState, action)).toEqual(expectedState);
  });
});
