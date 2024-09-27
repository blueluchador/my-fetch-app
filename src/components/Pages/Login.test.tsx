/** @jest-environment jsdom */

import { messages } from "../../locales";
import { cleanup, screen, wrapper } from "../../test-utils";

import Login from "./Login";

afterEach(cleanup);

describe("[components] <Login />", () => {
  const enUs = messages["en-US"];

  it("renders the the login page", () => {
    wrapper(<Login />, { withRouter: true });

    expect(screen.getByText(enUs.APP_NAME)).toBeInTheDocument();
    expect(screen.getByText(enUs.LOGIN_EMAIL_LABEL)).toBeInTheDocument();
    expect(screen.getByText(enUs.LOGIN_NAME_LABEL)).toBeInTheDocument();

    const elements = screen.getAllByText(/Login/);
    expect(elements).toHaveLength(2);
  });
});
