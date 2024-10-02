import { ThunkAction } from "redux-thunk";

import { fetchDogBreedsApi } from "../../api";
import {
  DogsActionTypes,
  fetchDogBreedsFailure,
  fetchDogBreedsRequest,
  fetchDogBreedsSuccess,
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
      const dogBreeds = await fetchDogBreedsApi();
      dispatch(fetchDogBreedsSuccess(dogBreeds));
    } catch (error) {
      dispatch(fetchDogBreedsFailure((error as Error).message));
    }
  };
};
