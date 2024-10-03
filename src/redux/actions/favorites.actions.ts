import { Dog } from "../../models";

export const ADD_TO_FAVORITES = "ADD_TO_FAVORITES";
export const REMOVE_FROM_FAVORITES = "REMOVE_FROM_FAVORITES";

interface AddToFavorites {
  type: typeof ADD_TO_FAVORITES;
  dog: Dog;
}

interface RemoveFromFavorites {
  type: typeof REMOVE_FROM_FAVORITES;
  dogId: string;
}

export type FavoritesActionTypes = AddToFavorites | RemoveFromFavorites;

export const addToFavorites = (dog: Dog): AddToFavorites => ({
  dog,
  type: ADD_TO_FAVORITES,
});

export const removeFromFavorites = (dogId: string): RemoveFromFavorites => ({
  dogId,
  type: REMOVE_FROM_FAVORITES,
});
