import React from 'react'

export const DeletePopUp = ({ func, id, toggl }) => {
    return (
        <div id="delete_pop_up">
            <h1>Are you sure?</h1>
            <p>You are about to delete the event from the system. Please proceed with caution.</p>
            <span>
                <button type='button' onClick={toggl}>Cancel</button>
                <button type='button' onClick={() => { func(id) }}>Delete Event</button>
            </span>
        </div>
    )
}