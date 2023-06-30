import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux'
import { Link, Outlet, useLocation } from 'react-router-dom'

export const User = () => {
    const role = useSelector(state => state.idReducer.role.role);
    const location = useLocation();
    const [name, setName] = useState('')
    useEffect(() => {
        siteName();
    }, [location, name]);
    const siteName = () => {
        const loc = location.pathname.split('/')[2]
        if (loc === 'details') {
            setName('User Details')
        } else if (loc === 'manage') {
            setName('Users')
        } else if (loc === 'events') {
            setName('Events');
        } else {
            setName('Ticket History')
        }
    }
    const logOut = async () => {
        try {
            const response = await fetch(`/api/v1/auth/logout`, {
                method: 'GET',
                headers: {
                    'Content-type': 'aplication/json'
                },
                credentials: 'include'
            });
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
                    <div id="user_top" style={{ display: 'flex', justifyContent: 'space-between' }}>
                        <h1>{name}</h1>
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
                    </div>

                    <Outlet />
                </div> : <script>{window.location.replace('/')}</script>}
        </div>
    )
}