/* eslint-disable @typescript-eslint/no-unused-vars */
import { Dog } from "../models";
import { loadFavoritesFromStorage, saveFavoritesToStorage } from "../utils"; // Adjust the path as needed

describe("localStorage Favorites Functions", () => {
  beforeEach(() => {
    // Clear mocks and reset localStorage before each test
    jest.clearAllMocks();
    localStorage.clear();
  });

  describe("loadFavoritesFromStorage", () => {
    it("should load and return favorites from local storage", () => {
      const mockDogs: Dog[] = [
        { age: 3, breed: "Labrador", id: "1", img: "fido.jpg", name: "Fido", zip_code: "12345" },
        { age: 5, breed: "Bulldog", id: "2", img: "rex.jpg", name: "Rex", zip_code: "67890" },
      ];
      const serializedData = JSON.stringify(mockDogs);

      // Mock localStorage.getItem
      const getItemSpy = jest.spyOn(Storage.prototype, "getItem").mockReturnValue(serializedData);

      const loadedDogs = loadFavoritesFromStorage();

      expect(loadedDogs).toEqual(mockDogs);
      expect(getItemSpy).toHaveBeenCalledWith("favoriteDogs");
    });

    it("should return an empty array if no favorites exist in local storage", () => {
      // Mock localStorage.getItem to return null (no data)
      const getItemSpy = jest.spyOn(Storage.prototype, "getItem").mockReturnValue(null);

      const loadedDogs = loadFavoritesFromStorage();

      expect(loadedDogs).toEqual([]);
      expect(getItemSpy).toHaveBeenCalledWith("favoriteDogs");
    });

    it("should return an empty array and log error if loading fails", () => {
      const getItemSpy = jest.spyOn(Storage.prototype, "getItem").mockImplementation(() => {
        throw new Error("Error accessing local storage");
      });

      const consoleErrorSpy = jest.spyOn(console, "error").mockImplementation(() => {});

      const loadedDogs = loadFavoritesFromStorage();

      expect(loadedDogs).toEqual([]);
      expect(consoleErrorSpy).toHaveBeenCalledWith(
        "Could not load favorites from local storage",
        expect.any(Error),
      );
    });
  });

  describe("saveFavoritesToStorage", () => {
    it("should save favorites to local storage", () => {
      const mockDogs: Dog[] = [
        { age: 3, breed: "Labrador", id: "1", img: "fido.jpg", name: "Fido", zip_code: "12345" },
        { age: 5, breed: "Bulldog", id: "2", img: "rex.jpg", name: "Rex", zip_code: "67890" },
      ];

      const setItemSpy = jest.spyOn(Storage.prototype, "setItem");

      saveFavoritesToStorage(mockDogs);

      expect(setItemSpy).toHaveBeenCalledWith("favoriteDogs", JSON.stringify(mockDogs));
    });

    it("should log an error if saving fails", () => {
      const setItemSpy = jest.spyOn(Storage.prototype, "setItem").mockImplementation(() => {
        throw new Error("Error accessing local storage");
      });

      const consoleErrorSpy = jest.spyOn(console, "error").mockImplementation(() => {});

      const mockDogs: Dog[] = [
        { age: 3, breed: "Labrador", id: "1", img: "fido.jpg", name: "Fido", zip_code: "12345" },
      ];

      saveFavoritesToStorage(mockDogs);

      expect(consoleErrorSpy).toHaveBeenCalledWith(
        "Could not save favorites to local storage",
        expect.any(Error),
      );
    });
  });
});
