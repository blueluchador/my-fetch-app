import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { BrowserRouter as Router, Navigate, Route, Routes } from "react-router-dom";

import { getIsAuthenticated } from "../redux/selectors";
import { AppDispatch } from "../redux/store";
import { fetchIsAuthenticated } from "../redux/thunks";

import Layout from "./Layout";
import { Favorites, Login, Search } from "./Pages";

const App: React.FC = () => {
  const dispatch: AppDispatch = useDispatch();

  const isAuthenticated: boolean = useSelector(getIsAuthenticated);

  useEffect(() => {
    dispatch(fetchIsAuthenticated());
  }, [dispatch]);

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
              <Navigate to="/login" />
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
              <Navigate to="/login" />
            )
          }
          path="/favorites"
        />

        {/* Redirect all unmatched routes to Login */}
        <Route element={<Navigate to="/login" />} path="*" />
      </Routes>
    </Router>
  );
};

export default App;
