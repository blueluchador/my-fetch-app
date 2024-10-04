import { Reducer } from "react";

import {
  MATCH_DOG_FAILURE,
  MATCH_DOG_REQUEST,
  MATCH_DOG_SUCCESS,
  MatchDogActionTypes,
} from "../actions";

interface MatchDogState {
  match: string;
  loading: boolean;
  error: string | null;
}

const initialState: MatchDogState = {
  error: null,
  loading: false,
  match: "",
};

export const matchDogReducer: Reducer<MatchDogState, MatchDogActionTypes> = (
  state = initialState,
  action,
) => {
  switch (action.type) {
    case MATCH_DOG_REQUEST:
      return {
        ...state,
        error: null,
        loading: true,
      };
    case MATCH_DOG_SUCCESS:
      return {
        ...state,
        error: null,
        loading: false,
        match: action.payload.match,
      };
    case MATCH_DOG_FAILURE:
      return {
        ...state,
        error: action.error,
        loading: false,
      };
    default:
      return state;
  }
};
