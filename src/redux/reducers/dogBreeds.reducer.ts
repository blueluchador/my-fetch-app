import { Reducer } from "react";

import {
  DogsActionTypes,
  FETCH_DOG_BREEDS_REQUEST,
  FETCH_DOG_BREEDS_SUCCESS,
  FETCH_DOGS_FAILURE,
} from "../actions/dogs.actions";

interface DogBreedsState {
  breeds: string[];
  loading: boolean;
  error: string | null;
}

const initialState: DogBreedsState = {
  breeds: [],
  error: null,
  loading: false,
};

export const dogBreedsReducer: Reducer<DogBreedsState, DogsActionTypes> = (
  state = initialState,
  action,
) => {
  switch (action.type) {
    case FETCH_DOG_BREEDS_REQUEST:
      return {
        ...state,
        error: null,
        loading: true,
      };
    case FETCH_DOG_BREEDS_SUCCESS:
      return {
        ...state,
        breeds: action.payload,
        error: null,
        loading: false,
      };
    case FETCH_DOGS_FAILURE:
      return {
        ...state,
        error: action.error,
        loading: false,
      };
    default:
      return state;
  }
};
