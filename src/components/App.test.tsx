import { render, screen } from "@testing-library/react";

import App from "./App";

test.skip("skipped until wrapper util is added", () => {
  render(<App></App>);
  const linkElement = screen.getByText(/Hello, Fetch!/i);
  expect(linkElement).toBeInTheDocument();
});
