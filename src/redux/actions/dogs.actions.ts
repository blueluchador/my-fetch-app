import { Dog, SearchResult } from "../../models";

export const SEARCH_DOGS_REQUEST = "SEARCH_DOGS_REQUEST";
export const SEARCH_DOGS_SUCCESS = "SEARCH_DOGS_SUCCESS";
export const SEARCH_DOGS_FAILURE = "SEARCH_DOGS_FAILURE";

export const FETCH_DOGS_REQUEST = "FETCH_DOGS_REQUEST";
export const FETCH_DOGS_SUCCESS = "FETCH_DOGS_SUCCESS";
export const FETCH_DOGS_FAILURE = "FETCH_DOGS_FAILURE";

export const FETCH_DOG_BREEDS_REQUEST = "FETCH_DOG_BREEDS_REQUEST";
export const FETCH_DOG_BREEDS_SUCCESS = "FETCH_DOG_BREEDS_SUCCESS";
export const FETCH_DOG_BREEDS_FAILURE = "FETCH_DOG_BREEDS_FAILURE";

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

export type DogsActionTypes =
  | FetchDogBreedsRequest
  | FetchDogBreedsSuccess
  | FetchDogBreedsFailure
  | SearchDogsRequest
  | SearchDogsSuccess
  | SearchDogsFailure
  | FetchDogsRequest
  | FetchDogsSuccess
  | FetchDogsFailure;

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
