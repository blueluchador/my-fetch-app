import { ThunkAction } from "redux-thunk";

import { dogSearchApi, fetchDogBreedsApi } from "../../api";
import { SearchResult } from "../../models";
import {
  DogsActionTypes,
  fetchDogBreedsFailure,
  fetchDogBreedsRequest,
  fetchDogBreedsSuccess,
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
    dispatch(fetchDogBreedsRequest);

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
    dispatch(searchDogsRequest);

    try {
      const result: SearchResult = await dogSearchApi(breeds, sort);
      dispatch(searchDogsSuccess(result));
    } catch (error) {
      dispatch(searchDogsFailure((error as Error).message));
    }
  };
};
