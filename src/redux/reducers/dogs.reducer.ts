import { Reducer } from "react";

import { Dog } from "../../models";
import {
  DogsActionTypes,
  FETCH_DOGS_FAILURE,
  FETCH_DOGS_REQUEST,
  FETCH_DOGS_SUCCESS,
} from "../actions";

interface DogState {
  dogs: Dog[];
  loading: boolean;
  error: string | null;
}

const initialState: DogState = {
  dogs: [],
  error: null,
  loading: false,
};

export const dogsReducer: Reducer<DogState, DogsActionTypes> = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_DOGS_REQUEST:
      return {
        ...state,
        error: null,
        loading: true,
      };
    case FETCH_DOGS_SUCCESS:
      return {
        ...state,
        dogs: action.payload,
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
