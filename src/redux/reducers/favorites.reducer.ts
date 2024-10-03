import { Reducer } from "react";

import { Dog } from "../../models";
import { ADD_TO_FAVORITES, FavoritesActionTypes, REMOVE_FROM_FAVORITES } from "../actions";

interface FavoritesState {
  dogs: Dog[];
}

const initialState: FavoritesState = {
  dogs: [],
};

export const favoritesReducer: Reducer<FavoritesState, FavoritesActionTypes> = (
  state = initialState,
  action,
) => {
  switch (action.type) {
    case ADD_TO_FAVORITES:
      return {
        ...state,
        dogs: [...state.dogs, action.dog],
      };
    case REMOVE_FROM_FAVORITES:
      return {
        ...state,
        dogs: state.dogs.filter((dog) => dog.id !== action.dogId),
      };
    default:
      return state;
  }
};
