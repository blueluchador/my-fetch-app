import { Dog } from "../../models";

import {
  ADD_TO_FAVORITES,
  addToFavorites,
  REMOVE_FROM_FAVORITES,
  removeFromFavorites,
} from "./favorites.actions";

describe("Favorites actions", () => {
  it("should create an action to add a dog to favorites", () => {
    const dog: Dog = {
      age: 3,
      breed: "Labrador",
      id: "dog1",
      img: "dog1.jpg",
      name: "Buddy",
      zip_code: "12345",
    };
    const expectedAction = {
      dog,
      type: ADD_TO_FAVORITES,
    };
    expect(addToFavorites(dog)).toEqual(expectedAction);
  });

  it("should create an action to remove a dog from favorites", () => {
    const dogId = "dog1";
    const expectedAction = {
      dogId,
      type: REMOVE_FROM_FAVORITES,
    };
    expect(removeFromFavorites(dogId)).toEqual(expectedAction);
  });
});
