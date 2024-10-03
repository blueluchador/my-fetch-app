import { ThunkAction } from "redux-thunk";

import { dogSearchApi, fetchDogBreedsApi, fetchDogsApi } from "../../api";
import { SearchResult } from "../../models";
import { Dog } from "../../models";
import {
  DogsActionTypes,
  fetchDogBreedsFailure,
  fetchDogBreedsRequest,
  fetchDogBreedsSuccess,
  fetchDogsFailure,
  fetchDogsRequest,
  //fetchDogsRequest,
  fetchDogsSuccess,
  searchDogsFailure,
  searchDogsRequest,
  searchDogsSuccess,
} from "../actions/dogs.actions";
import { RootState } from "../store";

export const fetchDogBreeds = (): ThunkAction<
  Promise<void>,
  RootState,
  unknown,
  DogsActionTypes
> => {
  return async (dispatch) => {
    dispatch(fetchDogBreedsRequest());

    try {
      const dogBreeds: string[] = await fetchDogBreedsApi();
      dispatch(fetchDogBreedsSuccess(dogBreeds));
    } catch (error) {
      dispatch(fetchDogBreedsFailure((error as Error).message));
    }
  };
};

export const searchDogs = (
  breeds?: string[],
  sort?: string,
): ThunkAction<Promise<void>, RootState, unknown, DogsActionTypes> => {
  return async (dispatch) => {
    // Search
    dispatch(searchDogsRequest());

    try {
      const result: SearchResult = await dogSearchApi(breeds, sort);
      dispatch(searchDogsSuccess(result));

      // Fetch dogs
      dispatch(fetchDogsRequest);

      try {
        const dogs: Dog[] = await fetchDogsApi(result.resultIds);
        dispatch(fetchDogsSuccess(dogs));
      } catch (error) {
        dispatch(fetchDogsFailure((error as Error).message));
      }
    } catch (error) {
      dispatch(searchDogsFailure((error as Error).message));
    }
  };
};
