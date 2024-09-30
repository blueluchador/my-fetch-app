/** @jest-environment jsdom */
import { useSelector } from "react-redux";

import { messages } from "../../locales";
import { cleanup, screen, wrapper } from "../../test-utils";

import Login from "./Login";

// Mocking useSelector
jest.mock("react-redux", () => ({
  ...jest.requireActual("react-redux"),
  useSelector: jest.fn(),
}));

afterEach(cleanup);

describe("[components] <Login />", () => {
  const mockSelector = useSelector as unknown as jest.Mock;

  beforeEach(() => {
    mockSelector.mockClear(); // Clear previous mock data between tests
  });

  it("renders the login page when not loading", () => {
    // Mock isLoginLoading to be false (not loading state)
    mockSelector.mockReturnValue(false);

    wrapper(<Login />, { withRouter: true });

    const enUs = messages["en-US"];
    expect(screen.getByText(enUs.APP_NAME)).toBeInTheDocument();
    expect(screen.getByText(enUs.LOGIN_EMAIL_LABEL)).toBeInTheDocument();
    expect(screen.getByText(enUs.LOGIN_NAME_LABEL)).toBeInTheDocument();

    const elements = screen.getAllByText(/Login/);
    expect(elements).toHaveLength(2); // Ensures there are two 'Login' texts on the page
  });

  it("renders the login button as loading", () => {
    // Mock isLoginLoading to be true (loading state)
    mockSelector.mockReturnValue(true);

    wrapper(<Login />, { withRouter: true });

    expect(screen.getByText("Logging in...")).toBeInTheDocument(); // Checks for the loading text
  });
});
