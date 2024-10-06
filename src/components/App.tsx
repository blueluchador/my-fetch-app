import React, { useEffect } from "react";
import { useIntl } from "react-intl";
import { useDispatch, useSelector } from "react-redux";
import { BrowserRouter as Router, Navigate, Route, Routes, useLocation } from "react-router-dom";
import { Spinner } from "evergreen-ui";

import { getIsAuthenticated } from "../redux/selectors";
import { AppDispatch } from "../redux/store";
import { fetchIsAuthenticated } from "../redux/thunks";

import Layout from "./Layout";
import { Favorites, Login, NotFound, Search } from "./Pages";

const App: React.FC = () => {
  const intl = useIntl();

  const dispatch: AppDispatch = useDispatch();
  const isAuthenticated: boolean | null = useSelector(getIsAuthenticated);

  useEffect(() => {
    dispatch(fetchIsAuthenticated());
  }, [dispatch]);

  const RedirectToLogin = () => {
    const location = useLocation();
    return <Navigate replace state={{ from: location }} to="/login" />;
  };

  if (isAuthenticated === null) {
    return (
      <div
        aria-busy="true"
        aria-label={intl.formatMessage({ id: "LOADING_AUTH_STATUS_ARIA_LABEL" })}
        aria-live="assertive"
        role="alert"
        style={{
          alignItems: "center",
          display: "flex",
          height: "100vh",
          justifyContent: "center",
        }}>
        <Spinner aria-label={intl.formatMessage({ id: "LOADING_SPINNER_ARIA_LABEL" })} />
      </div>
    );
  }

  return (
    <Router>
      <Routes>
        {/* Public Route without Layout */}
        <Route element={<Login />} path="/login" />

        {/* Redirect root to Search */}
        <Route element={<Navigate to="/search" />} path="/" />

        {/* Protected Routes with Layout */}
        <Route
          element={
            isAuthenticated ? (
              <Layout>
                <Search />
              </Layout>
            ) : (
              <RedirectToLogin />
            )
          }
          path="/search"
        />
        <Route
          element={
            isAuthenticated ? (
              <Layout>
                <Favorites />
              </Layout>
            ) : (
              <RedirectToLogin />
            )
          }
          path="/favorites"
        />

        {/* Redirect all unmatched routes to NotFound */}
        <Route element={<NotFound />} path="*" />
      </Routes>
    </Router>
  );
};

export default App;
