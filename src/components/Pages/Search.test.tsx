/** @jest-environment jsdom */

import { messages } from "../../locales";
import { cleanup, screen, wrapper } from "../../test-utils";

import Search from "./Search";

afterEach(cleanup);

describe("[components] <Search />", () => {
  const enUs = messages["en-US"];

  it("renders the the search page", () => {
    wrapper(<Search />, { withRouter: true });

    expect(screen.getByText(enUs.SEARCH_PAGE_HEADING)).toBeInTheDocument();
  });
});
