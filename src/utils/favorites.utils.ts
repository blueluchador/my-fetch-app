import { Dog } from "../models";

export const loadFavoritesFromStorage = (): Dog[] => {
  try {
    const serializedData = localStorage.getItem("favoriteDogs");
    return serializedData ? JSON.parse(serializedData) : [];
  } catch (error) {
    console.error("Could not load favorites from local storage", error);
    return [];
  }
};

export const saveFavoritesToStorage = (dogs: Dog[]): void => {
  try {
    const serializedData = JSON.stringify(dogs);
    localStorage.setItem("favoriteDogs", serializedData);
  } catch (error) {
    console.error("Could not save favorites to local storage", error);
  }
};
