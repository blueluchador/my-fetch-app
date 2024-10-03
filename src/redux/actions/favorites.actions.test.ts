import { Dog } from "../../models";

import { SET_FAVORITES, setFavorites } from "./favorites.actions";

describe("Favorites actions", () => {
  it("should create an action to set favorite dogs", () => {
    const dogs: Dog[] = [
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

    const expectedAction = {
      dogs,
      type: SET_FAVORITES,
    };

    expect(setFavorites(dogs)).toEqual(expectedAction);
  });
});
