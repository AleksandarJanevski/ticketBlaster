import React from "react";
import { FetchCall } from "./authentication/fetchCall"
import { Navigation } from "./mainPages/Navigation";
import { Route, Routes } from 'react-router-dom';
import { Auth } from "./authentication/Auth";
import { Events } from './mainPages/Events'
import { EventForm } from './userPages/EventForm'
import { User } from './userPages/User'
//make redux for single event
export const App = () => {
  return (
    <div id="app">
      <FetchCall />
      <Navigation />
      <div id="content">
        <Routes>
          <Route path="/" element={<Events />} />
          <Route path="/login" element={<Auth />} />
          <Route path='/eventForm' element={<EventForm />} >
            <Route path="/eventForm/:eventId" element={<EventForm />}></Route>
          </Route>
          <Route path="/user" element={<User />} />
        </Routes>
      </div>
    </div>
  );
};