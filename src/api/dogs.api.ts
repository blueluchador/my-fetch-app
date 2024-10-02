import { Dog, DogMatch, SearchResult } from "../models";

const baseUrl = process.env.REACT_APP_API_URL || "https://frontend-take-home-service.fetch.com";

export const fetchDogBreedsApi = async (): Promise<string[]> => {
  const response = await fetch(`${baseUrl}/dogs/breeds`, {
    credentials: "include",
    method: "GET",
  });

  if (!response.ok) {
    throw new Error("Get dog breeds failed");
  }

  // Parse the response to return string[]
  const data: string[] = await response.json();
  return data;
};

export const dogSearchApi = async (breeds?: string[], sort?: string): Promise<SearchResult> => {
  const breedQuery =
    breeds && breeds.length > 0
      ? breeds.map((breed) => `breed=${encodeURIComponent(breed)}`).join("&")
      : "";

  const sortQuery = sort ? `sort=${encodeURIComponent(sort)}` : "";

  // Combine breed and sort queries
  const query = [breedQuery, sortQuery].filter(Boolean).join("&");

  const response = await fetch(`${baseUrl}/dogs/search${query ? `?${query}` : ""}`, {
    credentials: "include",
    method: "GET",
  });

  if (!response.ok) {
    throw new Error("Search failed");
  }

  // Parse the response to return SearchResult
  const data: SearchResult = await response.json();
  return data;
};

export const fetchDogsApi = async (dogs: string[]): Promise<Dog[]> => {
  const response = await fetch(`${baseUrl}/dogs`, {
    body: JSON.stringify(dogs),
    credentials: "include",
    headers: { "Content-Type": "application/json" },
    method: "POST",
  });

  if (!response.ok) {
    throw new Error("Failed to fetch dogs");
  }

  // Parse the response to return Dog[]
  const data: Dog[] = await response.json();
  return data;
};

export const dogMatchApi = async (dogs: string[]): Promise<DogMatch> => {
  const response = await fetch(`${baseUrl}/dogs/match`, {
    body: JSON.stringify(dogs),
    credentials: "include",
    headers: { "Content-Type": "application/json" },
    method: "POST",
  });

  if (!response.ok) {
    throw new Error("Failed to fetch dogs");
  }

  // Parse the response to return Dog[]
  const data: DogMatch = await response.json();
  return data;
};
