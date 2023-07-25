import React from "react";
import { FetchCall } from "./authentication/fetchCall";
import { Navigation } from "./mainPages/Navigation";
import { Route, Routes } from 'react-router-dom';
import { SignUp } from "./authentication/SingUp";
import { Login } from './authentication/Login'
import { ForgotPassword } from './authentication/ForgotPassword'
import { ResetPassword } from './authentication/ResetPassword'
import { Events } from './mainPages/Events';
import { EventForm } from './userPages/EventForm';
import { User } from './userPages/User';
import { AdminUsers } from './userPages/AdminUsers';
import { TicketHistory } from './userPages/TicketHistory';
import { ManageEvents } from './userPages/ManageEvents';
import { UserDetails } from './userPages/UserDetails';
import { SingleEvent } from './mainPages/SingleEvent'
import { Cart } from './userPages/Cart'
import { Search } from './mainPages/Search'
import { CategoryEvents } from "./mainPages/CategoryEvents";
import { CheckOut } from "./userPages/CheckOut";
import { Footer } from "./mainPages/Footer";

export const App = () => {
  return (
    <div id="app">
      <FetchCall />
      <Navigation />
      <div id="content">
        <Routes>
          <Route path="*" element={<Events />} />
          <Route path="/category/:type" element={<CategoryEvents />} />
          <Route path="/event/:id" element={<SingleEvent />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signUp" element={<SignUp />} />
          <Route path="/search" element={<Search />} />
          <Route path="/forgotPassword" element={<ForgotPassword />} />
          <Route path='/resetPassword/:token' element={<ResetPassword />} />
          <Route path="/user" element={<User />}>
            <Route path={'events'} element={<ManageEvents />} />
            <Route path={'manage'} element={<AdminUsers />} />
            <Route path={'ticketHistory'} element={<TicketHistory />} />
            <Route path={'details'} element={<UserDetails />} />
            <Route path={'eventForm'} element={<EventForm />} />
            <Route path={'eventForm/:eventId'} element={<EventForm />} />
          </Route>
          <Route path="/checkout" element={<CheckOut />} />
        </Routes>
      </div>
      <Footer />
    </div>
  );
};

export default App;
