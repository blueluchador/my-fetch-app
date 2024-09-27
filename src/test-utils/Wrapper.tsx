import React, { ReactElement } from "react";
import { HelmetProvider } from "react-helmet-async";
import { IntlProvider } from "react-intl";
import { Provider } from "react-redux";
import { BrowserRouter as Router } from "react-router-dom";
import { render, RenderOptions } from "@testing-library/react";
import { merge } from "lodash";
import configureMockStore from "redux-mock-store";

import { messages } from "../locales";
import { initialState } from "../test-utils";

export interface WrapperOptions extends RenderOptions {
  state?: any;
  withRouter?: boolean;
}

const wrapper = (ui: ReactElement, options?: Omit<WrapperOptions, "wrapper">) =>
  render(ui, {
    wrapper: ({ children }: { children: React.ReactNode }) => {
      const mockStore = configureMockStore();
      const enUs = messages["en-US"];
      const state = options?.state ? merge({}, initialState, options.state) : { ...initialState };
      HelmetProvider.canUseDOM = false;

      return (
        <Provider store={mockStore(state)}>
          <IntlProvider locale="en-US" messages={enUs}>
            <HelmetProvider>
              {options?.withRouter ? <Router>{children}</Router> : <>{children}</>}
            </HelmetProvider>
          </IntlProvider>
        </Provider>
      );
    },
    ...options,
  });

export { wrapper };
