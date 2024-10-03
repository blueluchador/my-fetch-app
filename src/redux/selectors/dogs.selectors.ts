import { Dog } from "../../models";
import { RootState } from "../store";

export const getDogBreeds = (state: RootState): string[] => state.dogBreeds.breeds;

export const getDogsLoading = (state: RootState): boolean =>
  state.dogSearch.loading || state.dogs.loading;

export const getDogs = (state: RootState): Dog[] => state.dogs.dogs;

export const getNumSearchResults = (state: RootState): number => state.dogSearch.search.total;
