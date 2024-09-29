import {
  getUserName,
  setUserSession,
  USER_SESSION_COOKIE_NAME,
  userSessionExists,
} from "./userSession.utils";

describe("userSessionExists", () => {
  beforeEach(() => {
    // Clear mocks between tests
    jest.spyOn(document, "cookie", "get").mockReturnValue("");
  });

  afterEach(() => {
    jest.restoreAllMocks(); // Restore original behavior after each test
  });

  it("should return true if user_session cookie exists", () => {
    jest.spyOn(document, "cookie", "get").mockReturnValue(`${USER_SESSION_COOKIE_NAME}gerry`);
    expect(userSessionExists()).toBe(true);
  });

  it("should return false if user_session cookie does not exist", () => {
    jest.spyOn(document, "cookie", "get").mockReturnValue("other_cookie=value");
    expect(userSessionExists()).toBe(false);
  });

  it("should return false if there are no cookies", () => {
    expect(userSessionExists()).toBe(false);
  });

  it("should return false if user_session cookie is malformed", () => {
    jest.spyOn(document, "cookie", "get").mockReturnValue("user_session_wrongformat");
    expect(userSessionExists()).toBe(false);
  });
});

describe("setUserSession", () => {
  afterEach(() => {
    jest.restoreAllMocks(); // Restore original behavior after each test
  });

  it("should set the user_session cookie with the provided value", () => {
    // Mock Date.now to get a predictable expiration time
    const mockDateNow = 1600000000000; // Some arbitrary timestamp
    jest.spyOn(Date, "now").mockReturnValue(mockDateNow);

    // Mock document.cookie setter
    const mockSetCookie = jest.spyOn(document, "cookie", "set").mockImplementation(() => {});

    const sessionValue = "gerry";
    setUserSession(sessionValue);

    const expectedExpirationTime = new Date(mockDateNow + 3600 * 1000).toUTCString();
    const expectedCookie = `${USER_SESSION_COOKIE_NAME}${encodeURIComponent(sessionValue)}; expires=${expectedExpirationTime}; path=/;`;

    expect(mockSetCookie).toHaveBeenCalledWith(expectedCookie);
  });
});

describe("getUserName", () => {
  afterEach(() => {
    jest.restoreAllMocks(); // Restore original behavior after each test
  });

  it("should return the user name if the user_session cookie exists", () => {
    const mockCookie = `${USER_SESSION_COOKIE_NAME}gerry; other_cookie=value`;
    jest.spyOn(document, "cookie", "get").mockReturnValue(mockCookie);

    expect(getUserName()).toBe("gerry");
  });

  it("should return null if the user_session cookie does not exist", () => {
    const mockCookie = "other_cookie=value";
    jest.spyOn(document, "cookie", "get").mockReturnValue(mockCookie);

    expect(getUserName()).toBeNull();
  });

  it("should return null if no cookies exist", () => {
    jest.spyOn(document, "cookie", "get").mockReturnValue("");

    expect(getUserName()).toBeNull();
  });
});
