import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { Link, Outlet, useLocation, useNavigate } from "react-router-dom";

export const User = () => {
  const role = useSelector((state) => state.userReducer.user.role);
  const navigate = useNavigate();
  const location = useLocation();
  const [focus, setFocus] = useState(0);
  const [name, setName] = useState("");
  useEffect(() => {
    siteName();
  }, [location, name]);
  useEffect(() => {
    if (!role) {
      navigate("/");
    }
  }, [role]);
  const siteName = () => {
    const loc = location.pathname.split("/")[2];
    switch (loc) {
      case "details":
        setName("User Details");
        setFocus(3);
        break;
      case "manage":
        setName("Users");
        setFocus(2);
        break;
      case "events":
        setName("Events");
        setFocus(1);
        break;
      case "eventForm":
        setName("Events");
        setFocus(1);
        break;
      default:
        setName("Ticket History");
        setFocus(0);
        break;
    }
  };
  const logOut = async () => {
    try {
      const response = await fetch(`/api/v1/auth/logout`, {
        method: "GET",
        headers: {
          "Content-type": "aplication/json",
        },
        credentials: "include",
      });
      if (response.status === 204) {
        window.location.href = "/";
      }
      sessionStorage.setItem("signed", "false");
    } catch (err) {
      return console.log(err);
    }
  };
  return (
    <div>
      {role && (
        <div id="user">
          <div
            id="user_top"
            style={{ display: "flex", justifyContent: "space-between" }}
          >
            <span id="user_top_btn">
              <h1 id="top">{name}</h1>
              {location.pathname.split("/")[2] === "events" ? (
                <Link to="/user/eventForm">
                  <button>Create Event</button>
                </Link>
              ) : null}
            </span>

            <div id="user_nav">
              {role === "admin" ? (
                <ul>
                  <li>
                    <Link
                      style={{ color: focus === 1 ? "#ff48ab" : "#393939" }}
                      to="/user/events"
                    >
                      Events
                    </Link>
                  </li>
                  <li>
                    <Link
                      style={{ color: focus === 2 ? "#ff48ab" : "#393939" }}
                      to="/user/manage"
                    >
                      Users
                    </Link>
                  </li>
                  <li>
                    <Link
                      style={{ color: focus === 0 ? "#ff48ab" : "#393939" }}
                      to="/user/ticketHistory"
                    >
                      Ticket History
                    </Link>
                  </li>
                  <li>
                    <Link
                      style={{ color: focus === 3 ? "#ff48ab" : "#393939" }}
                      to="/user/details"
                    >
                      User Details
                    </Link>
                  </li>
                  <li>
                    <button onClick={logOut}>Log Out</button>
                  </li>
                </ul>
              ) : (
                <ul>
                  <li>
                    <Link to="/user/ticketHistory">Ticket History</Link>
                  </li>
                  <li>
                    <Link to="/user/details">User Details</Link>
                  </li>
                  <li>
                    <button onClick={logOut}>Log Out</button>
                  </li>
                </ul>
              )}
            </div>
          </div>

          <Outlet />
        </div>
      )}
    </div>
  );
};
