import { Dog } from "../../models";
import { FavoritesActionTypes, SET_FAVORITES } from "../actions";

import { favoritesReducer } from "./favorites.reducer";

describe("favoritesReducer", () => {
  it("should return the initial state when given an undefined state", () => {
    const action = { type: "UNKNOWN_ACTION" } as unknown as FavoritesActionTypes;
    const expectedState = { dogs: [] };

    expect(favoritesReducer(expectedState, action)).toEqual(expectedState);
  });

  it("should handle SET_FAVORITES action", () => {
    const initialState = { dogs: [] };
    const newDogs: Dog[] = [
      {
        age: 2,
        breed: "Beagle",
        id: "dog1",
        img: "beagle.jpg",
        name: "Charlie",
        zip_code: "23456",
      },
      {
        age: 4,
        breed: "Poodle",
        id: "dog2",
        img: "poodle.jpg",
        name: "Bella",
        zip_code: "78901",
      },
    ];

    const action: FavoritesActionTypes = {
      dogs: newDogs,
      type: SET_FAVORITES,
    };

    const expectedState = {
      dogs: newDogs,
    };

    expect(favoritesReducer(initialState, action)).toEqual(expectedState);
  });
});
