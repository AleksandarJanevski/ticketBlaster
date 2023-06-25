import React, { useState, useEffect } from "react";
import { Link } from 'react-router-dom'
import { idActions } from "../../redux/actions/idActions";
import { useDispatch } from "react-redux";

export const Navigation = () => {
    const [loggedIn, setLoggedIn] = useState(false);
    const dispatch = useDispatch()

    useEffect(() => {
        getUser();
    }, []);
    const getUser = async () => {
        try {
            const response = await fetch('/api/v1/auth', {
                method: 'GET',
                headers: {
                    'Content-type': 'aplication/json'
                },
                credentials: 'include'
            });
            const result = await response.json();
            if (result.status === 'success') {
                dispatch(idActions(result.data));
                setLoggedIn(true);
            }
        } catch (err) {
            setLoggedIn(false);
        }
    }

    return (
        <div id="main_header">
            <header>
                <nav id="navbar">
                    <ul>
                        <li><Link to="/">ticketblaster</Link></li>
                        <li><Link to="/musicalConcerts">Musical Concerts</Link></li>
                        <li><Link to="/standUpComedy">Stand-up Comedy</Link></li>
                    </ul>
                </nav>
                <div id="rightSide">
                    <div id="search">
                        <form action="" method="get">
                            <input type="text" placeholder="Search" name="keyword" />
                        </form>

                    </div>
                    {!loggedIn ? <div id="userAccess">
                        <button id="loginButton" type="button"><Link to="/login">Log in</Link></button>
                        <button id="signUpButton" type="button"><Link to="/signUp">Create Account</Link></button>
                    </div> : <div id="userNav">
                        <ul>
                            <li><Link to="/cart"><i className="fa-solid fa-cart-shopping" style={{ color: '#ff48ab' }}></i></Link></li>
                            <li><Link to="/userProfile"><i className="fa-solid fa-user" style={{ color: '#ff48ab' }}></i></Link></li>
                        </ul>
                    </div>}
                </div>
            </header>
        </div>
    )
}