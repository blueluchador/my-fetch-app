import { Dog } from "../../models";
import { ADD_TO_FAVORITES, FavoritesActionTypes, REMOVE_FROM_FAVORITES } from "../actions";

import { favoritesReducer } from "./favorites.reducer";

describe("favoritesReducer", () => {
  it("should return the initial state when given an undefined state", () => {
    const action = { type: "UNKNOWN_ACTION" } as unknown as FavoritesActionTypes;
    const expectedState = { dogs: [] };

    expect(favoritesReducer(expectedState, action)).toEqual(expectedState);
  });

  it("should handle ADD_TO_FAVORITES action", () => {
    const initialState = { dogs: [] };
    const newDog: Dog = {
      age: 5,
      breed: "Labrador",
      id: "1",
      img: "rex.jpg",
      name: "Rex",
      zip_code: "12345",
    };

    const action: FavoritesActionTypes = {
      dog: newDog,
      type: ADD_TO_FAVORITES,
    };

    const expectedState = {
      dogs: [newDog],
    };

    expect(favoritesReducer(initialState, action)).toEqual(expectedState);
  });

  it("should handle REMOVE_FROM_FAVORITES action", () => {
    const initialState = {
      dogs: [
        { age: 5, breed: "Labrador", id: "1", img: "rex.jpg", name: "Rex", zip_code: "12345" },
        { age: 3, breed: "Beagle", id: "2", img: "bella.jpg", name: "Bella", zip_code: "54321" },
      ],
    };

    const action: FavoritesActionTypes = {
      dogId: "1",
      type: REMOVE_FROM_FAVORITES,
    };

    const expectedState = {
      dogs: [
        { age: 3, breed: "Beagle", id: "2", img: "bella.jpg", name: "Bella", zip_code: "54321" },
      ],
    };

    expect(favoritesReducer(initialState, action)).toEqual(expectedState);
  });
});
