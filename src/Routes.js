import React from "react";
import { Routes, Route } from "react-router-dom";

/**
 * Import all page components
 */
import App from "./components/App";

const MainRoutes = () => (
  <Routes>
    <Route exact path="/" element={<App />} />
  </Routes>
);

export default MainRoutes;
