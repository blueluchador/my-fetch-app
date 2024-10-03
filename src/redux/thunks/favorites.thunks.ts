import { ThunkAction } from "redux-thunk";

import { Dog } from "../../models";
import { FavoritesActionTypes } from "../actions/favorites.actions";
import { RootState } from "../store";

export const addToFavorites = (
  dog: Dog,
): ThunkAction<void, RootState, unknown, FavoritesActionTypes> => {
  return (dispatch) => {
    dispatch(addToFavorites(dog));
  };
};

export const removeFromFavorites = (
  dogId: string,
): ThunkAction<void, RootState, unknown, FavoritesActionTypes> => {
  return (dispatch) => {
    dispatch(removeFromFavorites(dogId));
  };
};
