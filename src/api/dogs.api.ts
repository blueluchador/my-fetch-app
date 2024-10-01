import { Dog } from "../models";

const baseUrl = process.env.REACT_APP_API_URL || "https://frontend-take-home-service.fetch.com";

export const dogSearchApi = async (breeds?: string[]): Promise<Dog[]> => {
  const breedQuery =
    breeds && breeds.length > 0
      ? breeds.map((breed) => `breed=${encodeURIComponent(breed)}`).join("&")
      : "";

  const response = await fetch(`${baseUrl}/dogs/search${breedQuery ? `?${breedQuery}` : ""}`, {
    credentials: "include",
    method: "GET",
  });

  if (!response.ok) {
    throw new Error("Search failed");
  }

  // Parse the response to return Dog[]
  const data: Dog[] = await response.json();
  return data;
};
