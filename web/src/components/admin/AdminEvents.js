import React, { useState, useEffect } from 'react';


export const AdminEvents = () => {
    const [admin, setAdmin] = useState('false');
    async function verify() {
        try {
            const response = await fetch('/api/v1/auth/admin', {
                method: 'GET',
                headers: {
                    'Content-type': 'aplication/json'
                },
                credentials: 'include'
            });
            if (response.status === 'success') {
                setAdmin(true);
            }
        } catch (err) {
            window.location.href = '/home'
            return console.log(err);
        }
    }
    return (
        <div id="addEvent">
            {admin ?
                <div>

                </div>
                : null}
        </div>
    )
}