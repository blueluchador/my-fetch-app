/** @jest-environment jsdom */
import { messages } from "../../locales";
import { cleanup, screen, wrapper } from "../../test-utils";

import NotFound from "./NotFound";

afterEach(cleanup);

describe("[components] <NotFound />", () => {
  it("renders the not found page", () => {
    wrapper(<NotFound />, { withRouter: true });

    const enUs = messages["en-US"];
    expect(screen.getByText(enUs.PAGE_NOT_FOUND_TITLE)).toBeInTheDocument();
    expect(screen.getByText(enUs.PAGE_NOT_FOUND_TEXT)).toBeInTheDocument();
    expect(screen.getByText(enUs.BACK_HOME_BUTTON_TEXT)).toBeInTheDocument();
  });
});
