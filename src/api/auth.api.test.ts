import fetchMock from "jest-fetch-mock";

import { loginApi, logoutApi } from "./auth.api";
fetchMock.enableMocks();

describe("loginApi", () => {
  beforeAll(() => {
    // Mock the environment variable
    process.env.REACT_APP_API_URL = "https://frontend-take-home-service.fetch.com";
  });

  beforeEach(() => {
    fetchMock.resetMocks(); // Reset mocks before each test
  });

  it("should make a POST request to the correct endpoint", async () => {
    fetchMock.mockResponseOnce(JSON.stringify({ success: true }));

    const name = "Gerry";
    const email = "gerry.gastelum@gmail.com";

    await loginApi(name, email);

    expect(fetchMock).toHaveBeenCalledTimes(1); // Ensure fetch was called once
    expect(fetchMock).toHaveBeenCalledWith(`${process.env.REACT_APP_API_URL}/auth/login`, {
      body: JSON.stringify({ email, name }),
      credentials: "include",
      headers: { "Content-Type": "application/json" },
      method: "POST",
    });
  });

  it("should throw an error if the response is not ok", async () => {
    fetchMock.mockResponseOnce("", { status: 500 });

    const name = "John Doe";
    const email = "johndoe@example.com";

    await expect(loginApi(name, email)).rejects.toThrow("Login failed");
  });
});

describe("logoutApi", () => {
  beforeAll(() => {
    // Mock the environment variable
    process.env.REACT_APP_API_URL = "https://frontend-take-home-service.fetch.com";
  });

  beforeEach(() => {
    fetchMock.resetMocks(); // Reset mocks before each test
  });

  it("should make a POST request to the correct endpoint", async () => {
    fetchMock.mockResponseOnce(JSON.stringify({ success: true }));

    await logoutApi();

    expect(fetchMock).toHaveBeenCalledTimes(1); // Ensure fetch was called once
    expect(fetchMock).toHaveBeenCalledWith(`${process.env.REACT_APP_API_URL}/auth/logout`, {
      credentials: "include",
      method: "POST",
    });
  });

  it("should throw an error if the response is not ok", async () => {
    fetchMock.mockResponseOnce("", { status: 500 });

    await expect(logoutApi()).rejects.toThrow("Logout failed");
  });
});
