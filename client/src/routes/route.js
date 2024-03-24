import React from "react";
import { Routes, Route } from "react-router-dom";
import { BrowserRouter } from "react-router-dom";
import { HashRouter } from "react-router-dom";

import App from "../components/App"; // Import your home component
import Intro from "../components/intro";
import Admin from "../components/admin"; // Import your admin component

const AppRouter = () => {
  return (
    <HashRouter>
      <Routes>
        <Route path="/" element={<App />}></Route>
        <Route path="/admin" element={<Admin />}></Route>
      </Routes>
    </HashRouter>
  );
};

export default AppRouter;
