import React from "react";
import { Link } from "react-router-dom";
export const Footer = () => {
    return (
        <div id="footer">

            <ul>
                <li><Link to="/">ticketblaster</Link></li>
                <li><Link to="/category/musicalConcerts">Musical Concerts</Link></li>
                <li><Link to="/category/standUpComedy">Stand-up Comedy</Link></li>
            </ul>

            <div id="copyright">
                <p>Copyright TicketBlaster 2023</p>
            </div>
        </div>
    )
}