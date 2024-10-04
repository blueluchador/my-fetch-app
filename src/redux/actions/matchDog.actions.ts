import { DogMatch } from "../../models";

export const MATCH_DOG_REQUEST = "MATCH_DOG_REQUEST";
export const MATCH_DOG_SUCCESS = "MATCH_DOG_SUCCESS";
export const MATCH_DOG_FAILURE = "MATCH_DOG_FAILURE";

interface MatchDogRequest {
  type: typeof MATCH_DOG_REQUEST;
}

interface MatchDogSuccess {
  type: typeof MATCH_DOG_SUCCESS;
  payload: DogMatch;
}

interface MatchDogFailure {
  type: typeof MATCH_DOG_FAILURE;
  error: string;
}

export type MatchDogActionTypes = MatchDogRequest | MatchDogSuccess | MatchDogFailure;

export const matchDogRequest = (): MatchDogRequest => ({
  type: MATCH_DOG_REQUEST,
});

export const matchDogSuccess = (match: DogMatch): MatchDogSuccess => ({
  payload: match,
  type: MATCH_DOG_SUCCESS,
});

export const matchDogFailure = (error: string): MatchDogFailure => ({
  error,
  type: MATCH_DOG_FAILURE,
});
