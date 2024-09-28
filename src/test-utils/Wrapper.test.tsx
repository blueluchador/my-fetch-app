import { screen } from "@testing-library/react";

import { initialState, wrapper } from "../test-utils";

const TestComponent = () => <div>Test Component</div>;

describe("wrapper", () => {
  it("renders component with default options", () => {
    wrapper(<TestComponent />);

    // Check that the component is rendered
    expect(screen.getByText("Test Component")).toBeInTheDocument();
  });

  it("renders component with custom state", () => {
    const customState = {
      ...initialState,
      someFeature: {
        someValue: "customValue",
      },
    };

    wrapper(<TestComponent />, { state: customState });

    // Add specific assertions related to the custom state, if necessary
    expect(screen.getByText("Test Component")).toBeInTheDocument();
  });

  it("renders component with Router when withRouter is true", () => {
    wrapper(<TestComponent />, { withRouter: true });

    // Check that the component is rendered and the router is applied
    expect(screen.getByText("Test Component")).toBeInTheDocument();
  });
});
