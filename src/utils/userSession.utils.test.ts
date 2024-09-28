import { userSessionExists } from "./userSession.utils";

describe("userSessionExists", () => {
  beforeEach(() => {
    // Clear mocks between tests
    jest.spyOn(document, "cookie", "get").mockReturnValue("");
  });

  afterEach(() => {
    jest.restoreAllMocks(); // Restore original behavior after each test
  });

  it("should return true if user_session cookie exists", () => {
    jest.spyOn(document, "cookie", "get").mockReturnValue("user_session=gerry");
    expect(userSessionExists()).toBe(true);
  });

  it("should return false if user_session cookie does not exist", () => {
    jest.spyOn(document, "cookie", "get").mockReturnValue("other_cookie=value");
    expect(userSessionExists()).toBe(false);
  });

  it("should return false if there are no cookies", () => {
    expect(userSessionExists()).toBe(false);
  });
});
