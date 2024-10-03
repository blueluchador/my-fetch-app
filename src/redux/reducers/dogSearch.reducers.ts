import { Reducer } from "react";

import {
  DogsActionTypes,
  SEARCH_DOGS_FAILURE,
  SEARCH_DOGS_REQUEST,
  SEARCH_DOGS_SUCCESS,
} from "../actions";
import { SearchType } from "../types";

interface DogSearchState {
  search: SearchType;
  loading: boolean;
  error: string | null;
}

const initialState: DogSearchState = {
  error: null,
  loading: false,
  search: {
    next: null,
    prev: null,
    total: 0,
  },
};

export const dogSearchReducer: Reducer<DogSearchState, DogsActionTypes> = (
  state = initialState,
  action,
) => {
  switch (action.type) {
    case SEARCH_DOGS_REQUEST:
      return {
        ...state,
        error: null,
        loading: true,
      };
    case SEARCH_DOGS_SUCCESS:
      return {
        ...state,
        error: null,
        loading: false,
        search: {
          next: action.payload.next,
          prev: action.payload.prev,
          total: action.payload.total,
        },
      };
    case SEARCH_DOGS_FAILURE:
      return {
        ...state,
        error: action.error,
        loading: false,
      };
    default:
      return state;
  }
};
