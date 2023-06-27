import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux'
import { Link, useParams, Route, Routes, Outlet } from 'react-router-dom'

export const User = () => {
    const role = useSelector(state => state.idReducer.role.role);
    useEffect(() => { }, [])
    return (
        <div id="user">
            {role &&
                <div id="user_page">
                    <Outlet />
                    <div id="user_nav">
                        {role === 'admin' ?
                            <ul>
                                <li><Link to='/user/events'>Events</Link></li>
                                <li><Link to='/user/manage'>Users</Link></li>
                                <li><Link to="/user/ticketHistory">Ticket History</Link></li>
                                <li><Link to="/user/details">User Details</Link></li>
                                <li><button>Log Out</button></li>
                            </ul> :
                            <ul>
                                <li><Link to="/user/ticketHistory">Ticket History</Link></li>
                                <li><Link to="/user/details">User Details</Link></li>
                                <li><button>Log Out</button></li>
                            </ul>
                        }
                    </div>
                </div>}

        </div>
    )
}