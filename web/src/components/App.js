import React from "react";
import { FetchCall } from "./fetchCall"
import { Navigation } from "./Navigation";
import { Route, Routes } from 'react-router-dom';
import { Auth } from "./Auth";
import { Events } from './Events'

export const App = () => {
  return (
    <div id="app">
      <FetchCall />
      <Navigation />
      <div id="content">
        <Routes>
          <Route path="/" element={<Events />} />
          <Route path="/login" element={<Auth />} />
        </Routes>
      </div>
    </div>
  );
};