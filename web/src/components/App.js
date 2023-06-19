import React from "react";
import { Navigation } from "./Navigation";
import { Route, Routes } from 'react-router-dom';
import { Auth } from "./Auth";

export const App = () => {
  return (
    <div id="app">
      <Navigation />
      <Routes>
        <Route path="/login" element={<Auth />} />
      </Routes>
    </div>
  );
};