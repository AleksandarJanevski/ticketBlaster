import React from 'react'

export const AdminDelete = ({ func, id, toggl }) => {
    return (
        <div id="admin_popup">
            <h1>Are you sure?</h1>
            <p>You are about to delete a user. Please proceed with caution.</p>
            <span>
                <button type='button' onClick={toggl}>Cancel</button>
                <button type='button' onClick={() => { func(id) }}>Delete User</button>
            </span>
        </div>
    )
}