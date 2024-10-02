import { RootState } from "../store";

export const getDogBreeds = (state: RootState): string[] => state.dogBreeds.breeds;
