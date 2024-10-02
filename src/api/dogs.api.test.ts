import { Dog, DogMatch, SearchResult } from "../models";

import { dogMatchApi, dogSearchApi, fetchDogBreedsApi, fetchDogsApi } from "./dogs.api";

// Mocking the global fetch function
global.fetch = jest.fn();

describe("API functions", () => {
  beforeAll(() => {
    // Mock the environment variable
    process.env.REACT_APP_API_URL = "https://frontend-take-home-service.fetch.com";
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it("should fetch dog breeds successfully", async () => {
    const mockBreeds = ["Labrador", "Poodle"];
    (fetch as jest.Mock).mockResolvedValueOnce({
      json: jest.fn().mockResolvedValueOnce(mockBreeds),
      ok: true,
    });

    const result = await fetchDogBreedsApi();
    expect(result).toEqual(mockBreeds);
    expect(fetch).toHaveBeenCalledWith(`${process.env.REACT_APP_API_URL}/dogs/breeds`, {
      credentials: "include",
      method: "GET",
    });
  });

  it("should throw an error when fetching dog breeds fails", async () => {
    (fetch as jest.Mock).mockResolvedValueOnce({
      ok: false,
    });

    await expect(fetchDogBreedsApi()).rejects.toThrow("Get dog breeds failed");
  });

  it("should search dogs successfully with no breed filter and no sort parameter", async () => {
    const mockSearchResult: SearchResult = {
      next: "nextPageUrl",
      prev: "prevPageUrl",
      resultIds: ["dog1", "dog2"],
      size: 2,
    };
    (fetch as jest.Mock).mockResolvedValueOnce({
      json: jest.fn().mockResolvedValueOnce(mockSearchResult),
      ok: true,
    });

    const result = await dogSearchApi();
    expect(result).toEqual(mockSearchResult);
    expect(fetch).toHaveBeenCalledWith(`${process.env.REACT_APP_API_URL}/dogs/search`, {
      credentials: "include",
      method: "GET",
    });
  });

  it("should search dogs successfully with breed filter and no sort parameter", async () => {
    const mockSearchResult: SearchResult = {
      next: "nextPageUrl",
      prev: "prevPageUrl",
      resultIds: ["dog1", "dog2"],
      size: 2,
    };
    const breeds = ["Labrador"];
    (fetch as jest.Mock).mockResolvedValueOnce({
      json: jest.fn().mockResolvedValueOnce(mockSearchResult),
      ok: true,
    });

    const result = await dogSearchApi(breeds);
    expect(result).toEqual(mockSearchResult);
    expect(fetch).toHaveBeenCalledWith(
      `${process.env.REACT_APP_API_URL}/dogs/search?breed=Labrador`,
      {
        credentials: "include",
        method: "GET",
      },
    );
  });

  it("should search dogs successfully with breed filter and sort parameter", async () => {
    const mockSearchResult: SearchResult = {
      next: "nextPageUrl",
      prev: "prevPageUrl",
      resultIds: ["dog1", "dog2"],
      size: 2,
    };
    const breeds = ["Labrador"];
    const sort = "age";
    (fetch as jest.Mock).mockResolvedValueOnce({
      json: jest.fn().mockResolvedValueOnce(mockSearchResult),
      ok: true,
    });

    const result = await dogSearchApi(breeds, sort);
    expect(result).toEqual(mockSearchResult);
    expect(fetch).toHaveBeenCalledWith(
      `${process.env.REACT_APP_API_URL}/dogs/search?breed=Labrador&sort=age`,
      {
        credentials: "include",
        method: "GET",
      },
    );
  });

  it("should search dogs successfully with sort parameter and no breed filter", async () => {
    const mockSearchResult: SearchResult = {
      next: "nextPageUrl",
      prev: "prevPageUrl",
      resultIds: ["dog1", "dog2"],
      size: 2,
    };
    const sort = "name";
    (fetch as jest.Mock).mockResolvedValueOnce({
      json: jest.fn().mockResolvedValueOnce(mockSearchResult),
      ok: true,
    });

    const result = await dogSearchApi(undefined, sort);
    expect(result).toEqual(mockSearchResult);
    expect(fetch).toHaveBeenCalledWith(`${process.env.REACT_APP_API_URL}/dogs/search?sort=name`, {
      credentials: "include",
      method: "GET",
    });
  });

  it("should throw an error when dog search fails", async () => {
    (fetch as jest.Mock).mockResolvedValueOnce({
      ok: false,
    });

    await expect(dogSearchApi()).rejects.toThrow("Search failed");
  });

  it("should fetch dogs successfully", async () => {
    const mockDogs: Dog[] = [
      {
        age: 3,
        breed: "Labrador",
        id: "dog1",
        img: "dog1.jpg",
        name: "Buddy",
        zip_code: "12345",
      },
      {
        age: 5,
        breed: "Poodle",
        id: "dog2",
        img: "dog2.jpg",
        name: "Charlie",
        zip_code: "54321",
      },
    ];
    (fetch as jest.Mock).mockResolvedValueOnce({
      json: jest.fn().mockResolvedValueOnce(mockDogs),
      ok: true,
    });

    const dogIds = ["dog1", "dog2"];
    const result = await fetchDogsApi(dogIds);
    expect(result).toEqual(mockDogs);
    expect(fetch).toHaveBeenCalledWith(`${process.env.REACT_APP_API_URL}/dogs`, {
      body: JSON.stringify(dogIds),
      credentials: "include",
      headers: { "Content-Type": "application/json" },
      method: "POST",
    });
  });

  it("should throw an error when fetching dogs fails", async () => {
    (fetch as jest.Mock).mockResolvedValueOnce({
      ok: false,
    });

    const dogIds = ["dog1", "dog2"];
    await expect(fetchDogsApi(dogIds)).rejects.toThrow("Failed to fetch dogs");
  });

  it("should match dogs successfully", async () => {
    const mockMatch: DogMatch = { match: "Labrador" };
    (fetch as jest.Mock).mockResolvedValueOnce({
      json: jest.fn().mockResolvedValueOnce(mockMatch),
      ok: true,
    });

    const dogIds = ["dog1", "dog2"];
    const result = await dogMatchApi(dogIds);
    expect(result).toEqual(mockMatch);
    expect(fetch).toHaveBeenCalledWith(`${process.env.REACT_APP_API_URL}/dogs/match`, {
      body: JSON.stringify(dogIds),
      credentials: "include",
      headers: { "Content-Type": "application/json" },
      method: "POST",
    });
  });

  it("should throw an error when dog matching fails", async () => {
    (fetch as jest.Mock).mockResolvedValueOnce({
      ok: false,
    });

    const dogIds = ["dog1", "dog2"];
    await expect(dogMatchApi(dogIds)).rejects.toThrow("Failed to fetch dogs");
  });
});
