/** @jest-environment jsdom */

import { messages } from "../../locales";
import { cleanup, screen, wrapper } from "../../test-utils";

import Favorites from "./Favorites";

afterEach(cleanup);

describe("[components] <Favorites />", () => {
  const enUs = messages["en-US"];

  it("renders the the favorites page", () => {
    wrapper(<Favorites />, { withRouter: true });

    expect(screen.getByText(enUs.FAVORITES_PAGE_HEADING)).toBeInTheDocument();
  });
});
