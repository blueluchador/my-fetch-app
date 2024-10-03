import { Reducer } from "react";

import { Dog } from "../../models";
import { FavoritesActionTypes, SET_FAVORITES } from "../actions";

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
    case SET_FAVORITES:
      return {
        ...state,
        dogs: action.dogs,
      };
    default:
      return state;
  }
};
