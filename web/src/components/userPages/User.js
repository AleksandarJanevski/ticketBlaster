import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux'
import { Link, Outlet } from 'react-router-dom'

export const User = () => {
    const role = useSelector(state => state.idReducer.role.role);
    useEffect(() => { }, [])
    const logOut = async () => {
        try {
            const response = await fetch(`/api/v1/auth/logout`, {
                method: 'GET',
                headers: {
                    'Content-type': 'aplication/json'
                },
                credentials: 'include'
            });
            console.log(response);
            if (response.status === 204) {
                window.location.href = '/'
            }
        } catch (err) {
            return console.log(err);
        }
    }
    return (
        <div id="user">
            {role ?
                <div id="user_page">
                    <div id="user_nav">
                        {role === 'admin' ?
                            <ul>
                                <li><Link to='/user/events'>Events</Link></li>
                                <li><Link to='/user/manage'>Users</Link></li>
                                <li><Link to="/user/ticketHistory">Ticket History</Link></li>
                                <li><Link to="/user/details">User Details</Link></li>
                                <li><button onClick={logOut}>Log Out</button></li>
                            </ul> :
                            <ul>
                                <li><Link to="/user/ticketHistory">Ticket History</Link></li>
                                <li><Link to="/user/details">User Details</Link></li>
                                <li><button onClick={logOut}>Log Out</button></li>
                            </ul>
                        }
                    </div>
                    <Outlet />
                </div> : <script>{window.location.replace('/')}</script>}
        </div>
    )
}