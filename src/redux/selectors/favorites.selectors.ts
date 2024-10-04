import { Dog } from "../../models";
import { RootState } from "../store";

export const getFavoriteDogs = (state: RootState): Dog[] => state.favorites.dogs;

export const getDogMatchLoading = (state: RootState): boolean => state.matchDog.loading;

export const getDogMatch = (state: RootState): string => state.matchDog.match;
