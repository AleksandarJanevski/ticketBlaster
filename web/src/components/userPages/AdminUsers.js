import React, { useEffect, useState } from "react";
import { useSelector } from 'react-redux'

export const AdminUsers = () => {
    const admin = useSelector(state => state.idReducer.role.role);
    const op = useSelector(state => state.idReducer.id.id)
    const [users, setUsers] = useState([])
    useEffect(() => {
        if (admin && admin !== 'admin') {
            window.location.href = '/'
        }
        if (op) {
            getUsers();
        }
    }, [op])
    const getUsers = async () => {
        try {
            const response = await fetch('/api/v1/users', {
                method: 'GET',
                headers: {
                    'Content-type': 'aplication/json'
                },
                credentials: 'include'
            });
            const result = await response.json();
            console.log(result);
            if (result.status === 'success') {
                const filter = result.data.users.filter(users => users._id !== op)
                setUsers(filter)
            }
        } catch (err) {
            return console.log(err);
        }
    }
    const updateRole = async (user, type) => {
        try {
            let update = {
                role: 'admin'
            };
            if (type === 'admin') {
                update.role = 'user';
            }

            console.log(update.role);
            const response = await fetch(`/api/v1/users/role/${user}`, {
                method: 'POST',
                body: JSON.stringify(update),
                headers: {
                    'Content-type': 'application/json'
                },
                credentials: 'include'
            });
            const result = await response.json();
            if (result.status === 'success') {
                window.location.href = 'details';
            }
        } catch (err) {
            return console.log(err);
        }
    };
    const deleteUser = async (user) => {
        try {
            const response = await fetch(`/api/v1/users/${user}`, {
                method: 'DELETE',
                headers: {
                    'Content-type': 'application/json'
                },
                credentials: 'include'
            });

            if (response.status === 204) {
                window.location.href = '/user/manage';
            }
        } catch (err) {
            return console.log(err);
        }
    }

    return (
        <div id="admin_users">
            {users && admin && <div>
                {users.map((element, i) => {
                    return (
                        <span key={i} id="users_admin">
                            <img className="previewProfile" style={{ height: '80px', width: '80px', objectFit: 'cover', borderRadius: '50%' }} src={`/img/profile/${element.picture}`} alt="Cant reach" />
                            <p>{element.email}</p>
                            <p>{element.fullName}</p>
                            <button type="button" onClick={() => { updateRole(element._id, element.role) }}>{element.role === 'admin' ? 'Make User' : 'Make Admin'}</button>
                            <button type="button" onClick={() => { deleteUser(element._id) }}>Delete User</button>
                            <span id="devide user">
                                <hr style={{ opacity: "30%" }} />
                            </span>
                        </span>

                    )
                })}
            </div>}
        </div>
    )
}