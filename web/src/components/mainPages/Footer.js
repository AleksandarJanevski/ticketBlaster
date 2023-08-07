import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import logo from "./logo.png";
export const Footer = () => {
  const [focus, setFocus] = useState(0);
  const location = useLocation();
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
    <footer id="footer">
      <div id="footerNav">
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
        <div id="copyright">
          <p>Copyright TicketBlaster 2023</p>
        </div>
      </div>
    </footer>
  );
};
