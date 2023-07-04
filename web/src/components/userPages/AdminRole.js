import React from 'react'

export const AdminRole = ({ func, id, toggl, role }) => {
    return (
        <div id="admin_popup">
            {role === 'user' ? <>
                <h1>Are you sure?</h1>
                <p>You are about to make a user administrator of the system. Please proceed with caution.</p>
                <span>
                    <button type='button' onClick={toggl}>Cancel</button>
                    <button type='button' onClick={() => { func(id, role) }}>Make user admin</button>
                </span>
            </>
                :
                <>
                    <h1>Are you sure?</h1>
                    <p>You are about to downgrade a user from administrator. Please proceed with caution.</p>
                    <span>
                        <button type='button' onClick={toggl}>Cancel</button>
                        <button type='button' onClick={() => { func(id, role) }}>Downgrade user</button>
                    </span>
                </>}

        </div>
    )
}