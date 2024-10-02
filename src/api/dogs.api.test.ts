import { Dog, DogMatch, SearchResult } from "../models";

import { dogBreedsApi, dogSearchApi, dogsMatchApi, fetchDogsApi } from "./dogs.api";

const baseUrl = process.env.REACT_APP_API_URL || "https://frontend-take-home-service.fetch.com";

beforeEach(() => {
  jest.clearAllMocks();
});

describe("dogBreedsApi", () => {
  it("should fetch dog breeds and return an array of strings", async () => {
    const mockBreeds = ["Labrador", "Golden Retriever"];
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

  it("should throw an error if fetching breeds fails", async () => {
    global.fetch = jest.fn().mockResolvedValue({
      ok: false,
    });

    await expect(dogBreedsApi()).rejects.toThrow("Get dog breeds failed");
  });
});

describe("dogSearchApi", () => {
  it("should fetch dog search results and return SearchResult", async () => {
    const mockSearchResult: SearchResult = { dogs: [], total: 2 }; // Example structure
    global.fetch = jest.fn().mockResolvedValue({
      json: jest.fn().mockResolvedValue(mockSearchResult),
      ok: true,
    });

    const searchResult = await dogSearchApi(["Labrador"]);
    expect(fetch).toHaveBeenCalledWith(`${baseUrl}/dogs/search?breed=Labrador`, {
      credentials: "include",
      method: "GET",
    });
    expect(searchResult).toEqual(mockSearchResult);
  });

  it("should throw an error if search fails", async () => {
    global.fetch = jest.fn().mockResolvedValue({
      ok: false,
    });

    await expect(dogSearchApi(["Labrador"])).rejects.toThrow("Search failed");
  });

  it("should handle empty breed array and return SearchResult", async () => {
    const mockSearchResult: SearchResult = { dogs: [], total: 0 };
    global.fetch = jest.fn().mockResolvedValue({
      json: jest.fn().mockResolvedValue(mockSearchResult),
      ok: true,
    });

    const searchResult = await dogSearchApi();
    expect(fetch).toHaveBeenCalledWith(`${baseUrl}/dogs/search`, {
      credentials: "include",
      method: "GET",
    });
    expect(searchResult).toEqual(mockSearchResult);
  });
});

describe("fetchDogsApi", () => {
  it("should fetch specific dogs by IDs and return an array of Dog objects", async () => {
    const mockDogs: Dog[] = [{ breed: "Labrador", id: "1", name: "Buddy" }]; // Example Dog structure
    global.fetch = jest.fn().mockResolvedValue({
      json: jest.fn().mockResolvedValue(mockDogs),
      ok: true,
    });

    const dogs = await fetchDogsApi(["1"]);
    expect(fetch).toHaveBeenCalledWith(`${baseUrl}/dogs`, {
      body: JSON.stringify(["1"]),
      credentials: "include",
      headers: { "Content-Type": "application/json" },
      method: "POST",
    });
    expect(dogs).toEqual(mockDogs);
  });

  it("should throw an error if fetching dogs fails", async () => {
    global.fetch = jest.fn().mockResolvedValue({
      ok: false,
    });

    await expect(fetchDogsApi(["1"])).rejects.toThrow("Failed to fetch dogs");
  });
});

describe("dogsMatchApi", () => {
  it("should fetch dog matches and return a DogMatch object", async () => {
    const mockMatch: DogMatch = { match: { breed: "Labrador", id: "1", name: "Buddy" }, score: 95 };
    global.fetch = jest.fn().mockResolvedValue({
      json: jest.fn().mockResolvedValue(mockMatch),
      ok: true,
    });

    const match = await dogsMatchApi(["1"]);
    expect(fetch).toHaveBeenCalledWith(`${baseUrl}/dogs/match`, {
      body: JSON.stringify(["1"]),
      credentials: "include",
      headers: { "Content-Type": "application/json" },
      method: "POST",
    });
    expect(match).toEqual(mockMatch);
  });

  it("should throw an error if fetching matches fails", async () => {
    global.fetch = jest.fn().mockResolvedValue({
      ok: false,
    });

    await expect(dogsMatchApi(["1"])).rejects.toThrow("Failed to fetch dogs");
  });
});
