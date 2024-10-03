import { Dog } from "../../models";
import { RootState } from "../store";

export const getFavoriteDogs = (state: RootState): Dog[] => state.favorites.dogs;
