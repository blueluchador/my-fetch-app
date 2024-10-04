import { DogMatch } from "../../models";

import {
  MATCH_DOG_FAILURE,
  MATCH_DOG_REQUEST,
  MATCH_DOG_SUCCESS,
  matchDogFailure,
  matchDogRequest,
  matchDogSuccess,
} from "./matchDog.actions";

it("should create an action to request matching a dog", () => {
  const expectedAction = { type: MATCH_DOG_REQUEST };
  expect(matchDogRequest()).toEqual(expectedAction);
});

it("should create an action for successfully matching a dog", () => {
  const match: DogMatch = { match: "Labrador" };
  const expectedAction = {
    payload: match,
    type: MATCH_DOG_SUCCESS,
  };
  expect(matchDogSuccess(match)).toEqual(expectedAction);
});

it("should create an action for matching a dog failure", () => {
  const error = "Failed to match dog";
  const expectedAction = {
    error,
    type: MATCH_DOG_FAILURE,
  };
  expect(matchDogFailure(error)).toEqual(expectedAction);
});
