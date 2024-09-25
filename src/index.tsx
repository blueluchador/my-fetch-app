import React from "react";
import ReactDOM from "react-dom/client";
import { HelmetProvider } from "react-helmet-async";
import { IntlProvider } from "react-intl";

import App from "./components/App";
import { messages } from "./locales";
import reportWebVitals from "./reportWebVitals";

const root = ReactDOM.createRoot(document.getElementById("root") as HTMLElement);
root.render(
  <React.StrictMode>
    <IntlProvider defaultLocale="en-US" locale="en-US" messages={messages["en-US"]}>
      <HelmetProvider>
        <App />
      </HelmetProvider>
    </IntlProvider>
  </React.StrictMode>,
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
