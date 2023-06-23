import React, { useState, useCallback, useEffect } from "react";
import { useParams } from 'react-router-dom'

export const EventForm = () => {
    const { eventId } = useParams()
    const [bool, setBool] = useState(false)
    const [event, setEvent] = useState({
        name: '',
        category: '',
        details: '',
        location: '',
        picture: '',
        date: '',
        price: 0,
        tickets: 0
    })
    useEffect(() => {
        if (eventId) {
            getEvent();
        }
    }, [])
    const getEvent = async () => {
        try {
            const response = await fetch(`/api/v1/events/${eventId}`, {
                method: 'GET',
                headers: {
                    'Content-type': 'aplication/json'
                },
                credentials: 'include'
            });
            const result = await response.json()
            if (result.status === 'success') {
                setEvent(result.data.event);
                console.log(result.data.event);
            }
        } catch (err) {
            return console.log(err);
        }
    }

    return (
        <div id="eventForm">
            <div id="eFrom1">
                <span>
                    <label htmlFor="">Event Name</label>
                    <input type="text" name="name" value={event.name} onChange={(e) => { setEvent({ ...event, name: e.target.value }) }} className="formInput" required />
                </span>
                <span>
                    <label htmlFor="">Category</label>
                    <select name="category" id="category" required value={event.category} onChange={(e) => { setEvent({ ...event, category: e.target.value }) }}>
                        <option value="Musical Concerts">Musical Concerts</option>
                        <option value="Stand-up Comedy">Stand-up Comedy</option>
                    </select>
                </span>
                <span>
                    <label htmlFor="">Date</label>
                    <input type="date" name="date" className="formInput" required value={event.date ? new Date(event.date).toISOString().split('T')[0] : ''} onChange={(e) => { setEvent({ ...event, date: e.target.value }) }} />
                </span>
            </div>
        </div>
    )
}