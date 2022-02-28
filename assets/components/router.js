import * as React from "react";
import { Routes, Route, Link } from "react-router-dom";
import Home from "../pages/home";
import SportDetails from "../pages/sportDetails";

export default function Router() {
  return (
    <div>
        <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/sports/:id" element={<SportDetails />} />
        </Routes>
    </div>
  );
}