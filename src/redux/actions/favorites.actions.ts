import { Dog } from "../../models";

export const SET_FAVORITES = "SET_FAVORITES";

interface SetFavorites {
  type: typeof SET_FAVORITES;
  dogs: Dog[];
}

export type FavoritesActionTypes = SetFavorites;

export const setFavorites = (dogs: Dog[]): SetFavorites => ({
  dogs,
  type: SET_FAVORITES,
});
