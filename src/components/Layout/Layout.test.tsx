/** @jest-environment jsdom */
import React from "react";
import { IntlProvider } from "react-intl";
import { Provider } from "react-redux";
import { fireEvent, render, screen } from "@testing-library/react";
import { createStore } from "redux";

import { messages } from "../../locales";
import { logout } from "../../redux/thunks";

import Layout from "./Layout";

// Mock the dispatch function
jest.mock("react-redux", () => ({
  ...jest.requireActual("react-redux"),
  useDispatch: () => jest.fn(),
}));

jest.mock("../../redux/thunks", () => ({
  logout: jest.fn(),
}));

// Mock store (use a reducer with minimal setup)
const mockStore = createStore(() => ({}));

describe("Layout component", () => {
  const enUs = messages["en-US"];

  const renderComponent = (children: React.ReactNode) => {
    return render(
      <Provider store={mockStore}>
        <IntlProvider locale="en" messages={enUs}>
          <Layout>{children}</Layout>
        </IntlProvider>
      </Provider>,
    );
  };

  it("renders the layout with navigation links and footer", () => {
    renderComponent(<div>Test Content</div>);

    // Check if navigation texts are rendered correctly
    expect(screen.getByText(enUs.APP_NAME)).toBeInTheDocument();
    expect(screen.getByText(enUs.SEARCH_NAV_TEXT)).toBeInTheDocument();
    expect(screen.getByText(enUs.FAVORITES_NAV_TEXT)).toBeInTheDocument();
    expect(screen.getByText(enUs.LOGOUT_BUTTON_TEXT)).toBeInTheDocument();

    // Check if children content is rendered
    expect(screen.getByText("Test Content")).toBeInTheDocument();

    // Check footer content
    expect(screen.getByText(`© ${new Date().getFullYear()}`)).toBeInTheDocument();
    expect(screen.getByText(`${enUs.APP_NAME}. All rights reserved.`)).toBeInTheDocument();
  });

  it("handles logout button click", () => {
    renderComponent(<div>Test Content</div>);

    // Find the logout button
    const logoutButton = screen.getByText("Logout");
    fireEvent.click(logoutButton);

    // Ensure logout action is dispatched
    expect(logout).toHaveBeenCalledTimes(1);
  });
});
