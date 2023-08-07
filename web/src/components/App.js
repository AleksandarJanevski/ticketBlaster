import React from "react";
import { InitialCall } from "./utils/InitialCall";
import { Navigation } from "./mainPages/Navigation";
import { Route, Routes } from "react-router-dom";
import { SignUp } from "./authentication/SingUp";
import { Login } from "./authentication/Login";
import { ForgotPassword } from "./authentication/ForgotPassword";
import { ResetPassword } from "./authentication/ResetPassword";
import { Events } from "./mainPages/Events";
import { EventForm } from "./userPages/admin/EventForm";
import { User } from "./userPages/User";
import { AdminUsers } from "./userPages/admin/AdminUsers";
import { TicketHistory } from "./userPages/client/TicketHistory";
import { ManageEvents } from "./userPages/admin/ManageEvents";
import { UserDetails } from "./userPages/client/UserDetails";
import { SingleEvent } from "./mainPages/SingleEvent";
import { Cart } from "./userPages/client/Cart";
import { Search } from "./mainPages/Search";
import { CategoryEvents } from "./mainPages/CategoryEvents";
import { CheckOut } from "./userPages/client/CheckOut";
import { Footer } from "./mainPages/Footer";
import { PrintCard } from "./userPages/client/PrintCard";

export const App = () => {
  return (
    <div id="app">
      <InitialCall />
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
          <Route path="/resetPassword/:token" element={<ResetPassword />} />
          <Route path="/user" element={<User />}>
            <Route path={"events"} element={<ManageEvents />} />
            <Route path={"manage"} element={<AdminUsers />} />
            <Route path={"ticketHistory"} element={<TicketHistory />} />
            <Route path={"details"} element={<UserDetails />} />
            <Route path={"eventForm"} element={<EventForm />} />
            <Route path={"eventForm/:eventId"} element={<EventForm />} />
          </Route>
          <Route path="/checkout" element={<CheckOut />} />
          <Route path="/printPage" element={<PrintCard />}></Route>
        </Routes>
      </div>
      <Footer />
    </div>
  );
};
