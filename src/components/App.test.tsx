/** @jest-environment jsdom */

import { messages } from "../locales";
import { cleanup, screen, wrapper } from "../test-utils";

import App from "./App";

afterEach(cleanup);

describe("[components] <App />", () => {
  const enUs = messages["en-US"];

  it("renders the app", () => {
    wrapper(<App />);

    expect(screen.getByText(enUs.APP_NAME)).toBeInTheDocument();
  });
});
