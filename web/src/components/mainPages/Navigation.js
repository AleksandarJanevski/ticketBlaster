import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import logo from "./logo.png";

export const Navigation = () => {
  const user = useSelector((state) => state.userReducer.user);
  const [loggedIn, setLoggedIn] = useState(false);
  const [focus, setFocus] = useState(0);
  const location = useLocation();
  useEffect(() => {
    if (user.fullName) {
      setLoggedIn(true);
    }
  }, [user]);
  useEffect(() => {
    let category = location.pathname.split("/")[2];
    switch (category) {
      case "standUpComedy": {
        setFocus(2);
        break;
      }
      case "musicalConcerts": {
        setFocus(1);
        break;
      }
      default:
        setFocus(0);
    }
  }, [location]);
  return (
    <div id="main_header">
      <header>
        <nav id="navbar">
          <ul>
            <li>
              <Link to="/">
                <img src={logo} alt="" />
              </Link>
            </li>
            <li>
              <Link
                style={{ color: focus === 1 ? "#ff48ab" : "white" }}
                to="/category/musicalConcerts"
              >
                Musical Concerts
              </Link>
            </li>
            <li>
              <Link
                style={{ color: focus === 2 ? "#ff48ab" : "white" }}
                to="/category/standUpComedy"
              >
                Stand-up Comedy
              </Link>
            </li>
          </ul>
        </nav>
        <div id="rightSide">
          <div id="search">
            <form action="/search" method="get">
              <input type="text" placeholder="Search" name="keyword" />
            </form>
          </div>
          {!loggedIn ? (
            <div id="userAccess">
              <Link to="/login">
                <button id="loginButton" type="button">
                  Log in
                </button>
              </Link>
              <Link to="/signUp">
                <button id="signUpButton" type="button">
                  Create Account
                </button>
              </Link>
            </div>
          ) : (
            <div id="userNav">
              <ul>
                <li>
                  <Link to="/cart">
                    <i
                      className="fa-solid fa-cart-shopping"
                      style={{ color: "#ff48ab" }}
                    ></i>
                  </Link>
                </li>
                <li>
                  <Link to="/user/details">
                    <i
                      className="fa-solid fa-user"
                      style={{ color: "#ff48ab" }}
                    ></i>
                  </Link>
                </li>
              </ul>
            </div>
          )}
        </div>
      </header>
    </div>
  );
};
