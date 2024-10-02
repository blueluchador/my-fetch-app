import { Dog, DogMatch, SearchResult } from "../../models";

export const SEARCH_DOGS_REQUEST = "SEARCH_DOGS_REQUEST";
export const SEARCH_DOGS_SUCCESS = "SEARCH_DOGS_SUCCESS";
export const SEARCH_DOGS_FAILURE = "SEARCH_DOGS_FAILURE";

export const FETCH_DOGS_REQUEST = "FETCH_DOGS_REQUEST";
export const FETCH_DOGS_SUCCESS = "FETCH_DOGS_SUCCESS";
export const FETCH_DOGS_FAILURE = "FETCH_DOGS_FAILURE";

export const FETCH_DOG_BREEDS_REQUEST = "FETCH_DOG_BREEDS_REQUEST";
export const FETCH_DOG_BREEDS_SUCCESS = "FETCH_DOG_BREEDS_SUCCESS";
export const FETCH_DOG_BREEDS_FAILURE = "FETCH_DOG_BREEDS_FAILURE";

export const ADD_TO_FAVORITES = "ADD_TO_FAVORITES";
export const REMOVE_FROM_FAVORITES = "REMOVE_FROM_FAVORITES";

export const MATCH_DOG_REQUEST = "MATCH_DOG_REQUEST";
export const MATCH_DOG_SUCCESS = "MATCH_DOG_SUCCESS";
export const MATCH_DOG_FAILURE = "MATCH_DOG_FAILURE";

interface FetchDogBreedsRequest {
  type: typeof FETCH_DOG_BREEDS_REQUEST;
}

interface FetchDogBreedsSuccess {
  type: typeof FETCH_DOG_BREEDS_SUCCESS;
  payload: string[];
}

interface FetchDogBreedsFailure {
  type: typeof FETCH_DOG_BREEDS_FAILURE;
  error: string;
}

interface SearchDogsRequest {
  type: typeof SEARCH_DOGS_REQUEST;
}

interface SearchDogsSuccess {
  type: typeof SEARCH_DOGS_SUCCESS;
  payload: SearchResult;
}

interface SearchDogsFailure {
  type: typeof SEARCH_DOGS_FAILURE;
  error: string;
}

interface FetchDogsRequest {
  type: typeof FETCH_DOGS_REQUEST;
}

interface FetchDogsSuccess {
  type: typeof FETCH_DOGS_SUCCESS;
  payload: Dog[];
}

interface FetchDogsFailure {
  type: typeof FETCH_DOGS_FAILURE;
  error: string;
}

interface AddToFavorites {
  type: typeof ADD_TO_FAVORITES;
  dog: Dog;
}

interface RemoveFromFavorites {
  type: typeof REMOVE_FROM_FAVORITES;
  dogId: string;
}

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

export type DogsActionTypes =
  | FetchDogBreedsRequest
  | FetchDogBreedsSuccess
  | FetchDogBreedsFailure
  | SearchDogsRequest
  | SearchDogsSuccess
  | SearchDogsFailure
  | FetchDogsSuccess
  | FetchDogsSuccess
  | FetchDogsFailure
  | AddToFavorites
  | RemoveFromFavorites
  | MatchDogRequest
  | MatchDogSuccess
  | MatchDogFailure;

export const fetchDogBreedsRequest = (): FetchDogBreedsRequest => ({
  type: FETCH_DOG_BREEDS_REQUEST,
});

export const fetchDogBreedsSuccess = (breeds: string[]): FetchDogBreedsSuccess => ({
  payload: breeds,
  type: FETCH_DOG_BREEDS_SUCCESS,
});

export const fetchDogBreedsFailure = (error: string): FetchDogBreedsFailure => ({
  error,
  type: FETCH_DOG_BREEDS_FAILURE,
});

export const searchDogsRequest = (): SearchDogsRequest => ({
  type: SEARCH_DOGS_REQUEST,
});

export const searchDogsSuccess = (result: SearchResult): SearchDogsSuccess => ({
  payload: result,
  type: SEARCH_DOGS_SUCCESS,
});

export const searchDogsFailure = (error: string): SearchDogsFailure => ({
  error,
  type: SEARCH_DOGS_FAILURE,
});

export const fetchDogsRequest = (): FetchDogsRequest => ({
  type: FETCH_DOGS_REQUEST,
});

export const fetchDogsSuccess = (dogs: Dog[]): FetchDogsSuccess => ({
  payload: dogs,
  type: FETCH_DOGS_SUCCESS,
});

export const fetchDogsFailure = (error: string): FetchDogsFailure => ({
  error,
  type: FETCH_DOGS_FAILURE,
});

export const addToFavorites = (dog: Dog): AddToFavorites => ({
  dog,
  type: ADD_TO_FAVORITES,
});

export const removeFromFavorites = (dogId: string): RemoveFromFavorites => ({
  dogId,
  type: REMOVE_FROM_FAVORITES,
});

export const matchDogsReques = (): MatchDogRequest => ({
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
