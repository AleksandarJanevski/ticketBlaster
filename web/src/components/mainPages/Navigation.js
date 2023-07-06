import React, { useState, useEffect } from "react";
import { Link } from 'react-router-dom'
import { useSelector } from "react-redux";

export const Navigation = () => {
    const id = useSelector(state => state.idReducer.id.id)
    const [loggedIn, setLoggedIn] = useState(false);
    useEffect(() => {
        if (id) {
            setLoggedIn(true)
        }
    }, [id]);
    return (
        <div id="main_header">
            <header>
                <nav id="navbar">
                    <ul>
                        <li><Link to="/">ticketblaster</Link></li>
                        <li><Link to="/category/musicalConcerts">Musical Concerts</Link></li>
                        <li><Link to="/category/standUpComedy">Stand-up Comedy</Link></li>
                    </ul>
                </nav>
                <div id="rightSide">
                    <div id="search">
                        <form action="/search" method="get">
                            <input type="text" placeholder="Search" name="keyword" />
                        </form>

                    </div>
                    {!loggedIn ? <div id="userAccess">
                        <button id="loginButton" type="button"><Link to="/login">Log in</Link></button>
                        <button id="signUpButton" type="button"><Link to="/signUp">Create Account</Link></button>
                    </div> : <div id="userNav">
                        <ul>
                            <li><Link to="/cart"><i className="fa-solid fa-cart-shopping" style={{ color: '#ff48ab' }}></i></Link></li>
                            <li><Link to="/user/details"><i className="fa-solid fa-user" style={{ color: '#ff48ab' }}></i></Link></li>
                        </ul>
                    </div>}
                </div>
            </header>
        </div>
    )
}