import { Dog } from "../models";

import { dogBreedsApi, dogSearchApi } from "./dogs.api";

global.fetch = jest.fn();

describe("dogSearchApi", () => {
  const baseUrl = process.env.REACT_APP_API_URL || "https://frontend-take-home-service.fetch.com";

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
    expect(fetch).toHaveBeenCalledWith(`${baseUrl}/dogs/search?breed=Labrador&breed=Poodle`, {
      credentials: "include",
      method: "GET",
    });
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
    expect(fetch).toHaveBeenCalledWith(`${baseUrl}/dogs/search?breed=Labrador`, {
      credentials: "include",
      method: "GET",
    });
  });
});

describe("dogBreedsApi", () => {
  const baseUrl = process.env.REACT_APP_API_URL || "https://frontend-take-home-service.fetch.com";

  beforeEach(() => {
    // Clear mocks before each test
    jest.clearAllMocks();
  });

  it("should return an array of dog breeds on success", async () => {
    const mockBreeds = ["Labrador", "Beagle", "Poodle"];

    // Mock the global fetch function
    global.fetch = jest.fn().mockResolvedValue({
      json: jest.fn().mockResolvedValue(mockBreeds),
      ok: true,
    });

    const breeds = await dogBreedsApi();

    expect(fetch).toHaveBeenCalledWith(`${baseUrl}/dogs/breeds`, {
      credentials: "include",
      method: "GET",
    });

    expect(breeds).toEqual(mockBreeds);
  });

  it("should throw an error when the API request fails", async () => {
    // Mock a failed fetch request
    global.fetch = jest.fn().mockResolvedValue({
      ok: false,
    });

    await expect(dogBreedsApi()).rejects.toThrow("Get dog breeds failed");
  });
});
