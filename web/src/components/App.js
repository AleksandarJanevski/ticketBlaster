import React from "react";
import { FetchCall } from "./authentication/fetchCall";
import { Navigation } from "./mainPages/Navigation";
import { Route, Routes } from 'react-router-dom';
import { Auth } from "./authentication/Auth";
import { Events } from './mainPages/Events';
import { EventForm } from './userPages/EventForm';
import { User } from './userPages/User';
import { AdminUsers } from './userPages/AdminUsers';
import { TicketHistory } from './userPages/TicketHistory';
import { ManageEvents } from './userPages/ManageEvents';
import { UserDetails } from './userPages/UserDetails';
import { PrintEvent } from "./userPages/PrintEvent";
import { SingleEvent } from './mainPages/SingleEvent'
import { Cart } from './userPages/Cart'

//make redux for single event
export const App = () => {
  return (
    <div id="app">
      <FetchCall />
      <Navigation />
      <div id="content">
        <Routes>
          <Route path="/" element={<Events />} />
          <Route path="/event/:id" element={<SingleEvent />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/login" element={<Auth />} />
          <Route path='/eventForm' element={<EventForm />} >
            <Route path="/eventForm/:eventId" element={<EventForm />}></Route>
          </Route>
          <Route path="/user" element={<User />}>
            <Route path={'events'} element={<ManageEvents />} />
            <Route path={'manage'} element={<AdminUsers />} />
            <Route path={'ticketHistory'} element={<TicketHistory />}>
              <Route path={':event'} element={<PrintEvent />} />
            </Route>
            <Route path={'details'} element={<UserDetails />} />
          </Route>
        </Routes>
      </div>
    </div>
  );
};

export default App;
