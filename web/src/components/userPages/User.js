import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux'

export const User = () => {
    const role = useSelector(state => state.idReducer.role.role);
    useEffect(() => { }, [])
    return (
        <div id="user">
            <div id="user_left">

            </div>
            <div id="user_right">
                {role === 'admin' ?
                    <ul>
                        <li>Events</li>
                        <li>Users</li>
                        <li>Ticket History</li>
                        <li>User Detatils</li>
                        <li>Log Out</li>
                    </ul> :
                    <ul>
                        <li>Ticket History</li>
                        <li>User Detatils</li>
                        <li>Log Out</li>
                    </ul>
                }
            </div>
        </div>
    )
}