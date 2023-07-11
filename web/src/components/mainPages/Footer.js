import React from "react";
import { Link } from "react-router-dom";
import logo from './logo.png'
export const Footer = () => {
    return (
        <footer>
            <div id="footerNav">
                <ul>
                    <li><Link to="/"><img src={logo} alt="" /></Link></li>
                    <li><Link to="/category/musicalConcerts">Musical Concerts</Link></li>
                    <li><Link to="/category/standUpComedy">Stand-up Comedy</Link></li>
                </ul>
                <div id="copyright">
                    <p>Copyright TicketBlaster 2023</p>
                </div>
            </div>

        </footer>
    )
}