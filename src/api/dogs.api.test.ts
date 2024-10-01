import { Dog } from "../models";
import { dogSearchApi } from "./dogs.api";

global.fetch = jest.fn();

describe("dogSearchApi", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("should return a list of Dog objects when the API call is successful", async () => {
    const mockDogs: Dog[] = [
      {
        age: 3,
        breed: "Labrador",
        id: "1",
        img: "dog1.jpg",
        name: "Buddy",
        zip_code: "12345",
      },
      {
        age: 5,
        breed: "Poodle",
        id: "2",
        img: "dog2.jpg",
        name: "Max",
        zip_code: "67890",
      },
    ];

    // Mock the fetch call
    (fetch as jest.Mock).mockResolvedValueOnce({
      json: async () => mockDogs,
      ok: true,
    });

    const breeds = ["Labrador", "Poodle"];
    const result = await dogSearchApi(breeds);

    // Assertions
    expect(fetch).toHaveBeenCalledTimes(1);
    expect(fetch).toHaveBeenCalledWith(
      "https://frontend-take-home-service.fetch.com/dogs/search?breed=Labrador&breed=Poodle",
      {
        credentials: "include",
        method: "GET",
      },
    );
    expect(result).toEqual(mockDogs);
  });

  it("should throw an error when the API call fails", async () => {
    // Mock a failed fetch call
    (fetch as jest.Mock).mockResolvedValueOnce({
      ok: false,
    });

    await expect(dogSearchApi(["Labrador"])).rejects.toThrow("Search failed");

    // Ensure fetch was called correctly
    expect(fetch).toHaveBeenCalledTimes(1);
    expect(fetch).toHaveBeenCalledWith(
      "https://frontend-take-home-service.fetch.com/dogs/search?breed=Labrador",
      {
        credentials: "include",
        method: "GET",
      },
    );
  });
});
