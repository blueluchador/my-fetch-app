import { ThunkAction } from "redux-thunk";

import { Dog } from "../../models";
import { loadFavoritesFromStorage, saveFavoritesToStorage } from "../../utils";
import { FavoritesActionTypes, setFavorites } from "../actions/favorites.actions";
import { RootState } from "../store";

export const loadFavorites = (): ThunkAction<void, RootState, unknown, FavoritesActionTypes> => {
  return (dispatch) => {
    const dogs: Dog[] = loadFavoritesFromStorage();
    dispatch(setFavorites(dogs));
  };
};

export const addToFavorites = (
  dog: Dog,
): ThunkAction<void, RootState, unknown, FavoritesActionTypes> => {
  return (dispatch) => {
    // Load dogs and add dog.
    const dogs: Dog[] = loadFavoritesFromStorage();
    const dogsToSave: Dog[] = [...dogs, dog];

    // Save dogs and dispatch set favorites action.
    saveFavoritesToStorage(dogsToSave);
    dispatch(setFavorites(dogsToSave));
  };
};

export const removeFromFavorites = (
  dogId: string,
): ThunkAction<void, RootState, unknown, FavoritesActionTypes> => {
  return (dispatch) => {
    // Load dogs and remove dog.
    const dogs: Dog[] = loadFavoritesFromStorage();
    const dogsToSave: Dog[] = dogs.filter((dog) => dog.id !== dogId);

    // Save dogs and dispatch set favorites action.
    saveFavoritesToStorage(dogsToSave);
    dispatch(setFavorites(dogsToSave));
  };
};
