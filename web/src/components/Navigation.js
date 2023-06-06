import React, { useState, useEffect } from "react";
import { Link } from 'react-router-dom'
import axios from 'axios'

export const Navigation = () => {
    const [loggedIn, setLoggedIn] = useState(false)
    useEffect(() => { getUser() }, [])

    const getUser = async () => {
        try {
            const response = await axios.get('https://swapi.dev/api/people')
            console.log(response);
            setLoggedIn(true)
        } catch (err) {
            setLoggedIn(false)
        }
    }

    return (
        <header>
            <nav>
                <ul>
                    <li><Link to="/home">ticketblaster</Link></li>
                    <li><Link to="/musicalConcerts">Musical Concerts</Link></li>
                    <li><Link to="/standUpComedy">Stand-up Comedy</Link></li>
                </ul>
            </nav>
            <div id="rightSide">
                <div id="search">
                    <input type="text" placeholder="Search" />
                </div>
                {!loggedIn ? <div id="userAccess">
                    <button id="loginButton" type="button"><Link to="/login">Log in</Link></button>
                    <button id="signUpButton" type="button"><Link to="/signUp">Create Account</Link></button>
                </div> : <div id="userNav">
                    <ul>
                        <li><Link to="/cart"><i class="fa-solid fa-cart-shopping" style={{ color: '#ff48ab' }}></i></Link></li>
                        <li><Link to="/userProfile"><i class="fa-solid fa-user" style={{ color: '#ff48ab' }}></i></Link></li>
                    </ul>
                </div>}
            </div>

        </header>
    )
}