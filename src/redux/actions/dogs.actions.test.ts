import { Dog, SearchResult } from "../../models";

import {
  FETCH_DOG_BREEDS_FAILURE,
  FETCH_DOG_BREEDS_REQUEST,
  FETCH_DOG_BREEDS_SUCCESS,
  FETCH_DOGS_FAILURE,
  FETCH_DOGS_REQUEST,
  FETCH_DOGS_SUCCESS,
  fetchDogBreedsFailure,
  fetchDogBreedsRequest,
  fetchDogBreedsSuccess,
  fetchDogsFailure,
  fetchDogsRequest,
  fetchDogsSuccess,
  SEARCH_DOGS_FAILURE,
  SEARCH_DOGS_REQUEST,
  SEARCH_DOGS_SUCCESS,
  searchDogsFailure,
  searchDogsRequest,
  searchDogsSuccess,
} from "./dogs.actions";

describe("Dog actions", () => {
  it("should create an action to request dog breeds", () => {
    const expectedAction = { type: FETCH_DOG_BREEDS_REQUEST };
    expect(fetchDogBreedsRequest()).toEqual(expectedAction);
  });

  it("should create an action for successfully fetching dog breeds", () => {
    const breeds = ["Labrador", "Poodle"];
    const expectedAction = {
      payload: breeds,
      type: FETCH_DOG_BREEDS_SUCCESS,
    };
    expect(fetchDogBreedsSuccess(breeds)).toEqual(expectedAction);
  });

  it("should create an action for dog breeds failure", () => {
    const error = "Failed to fetch breeds";
    const expectedAction = {
      error,
      type: FETCH_DOG_BREEDS_FAILURE,
    };
    expect(fetchDogBreedsFailure(error)).toEqual(expectedAction);
  });

  it("should create an action to request a dog search", () => {
    const expectedAction = { type: SEARCH_DOGS_REQUEST };
    expect(searchDogsRequest()).toEqual(expectedAction);
  });

  it("should create an action for successfully searching dogs", () => {
    const result: SearchResult = {
      next: "nextPageUrl",
      prev: "prevPageUrl",
      resultIds: ["dog1", "dog2"],
      total: 2,
    };
    const expectedAction = {
      payload: result,
      type: SEARCH_DOGS_SUCCESS,
    };
    expect(searchDogsSuccess(result)).toEqual(expectedAction);
  });

  it("should create an action for search dogs failure", () => {
    const error = "Search failed";
    const expectedAction = {
      error,
      type: SEARCH_DOGS_FAILURE,
    };
    expect(searchDogsFailure(error)).toEqual(expectedAction);
  });

  it("should create an action to request fetching dogs", () => {
    const expectedAction = { type: FETCH_DOGS_REQUEST };
    expect(fetchDogsRequest()).toEqual(expectedAction);
  });

  it("should create an action for successfully fetching dogs", () => {
    const dogs: Dog[] = [
      {
        age: 3,
        breed: "Labrador",
        id: "dog1",
        img: "dog1.jpg",
        name: "Buddy",
        zip_code: "12345",
      },
      {
        age: 5,
        breed: "Poodle",
        id: "dog2",
        img: "dog2.jpg",
        name: "Charlie",
        zip_code: "54321",
      },
    ];
    const expectedAction = {
      payload: dogs,
      type: FETCH_DOGS_SUCCESS,
    };
    expect(fetchDogsSuccess(dogs)).toEqual(expectedAction);
  });

  it("should create an action for fetching dogs failure", () => {
    const error = "Failed to fetch dogs";
    const expectedAction = {
      error,
      type: FETCH_DOGS_FAILURE,
    };
    expect(fetchDogsFailure(error)).toEqual(expectedAction);
  });
});
