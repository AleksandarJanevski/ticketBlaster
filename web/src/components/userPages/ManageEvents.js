import React, { useEffect, useState } from "react";
import { formatDate } from '../functions/functions';
import { useSelector } from 'react-redux'
import { Link } from "react-router-dom";
import { DeletePopUp } from "./DeletePopUp";

export const ManageEvents = () => {
    const [events, setEvents] = useState([]);
    const [toggle, setToggle] = useState(false)
    const [eventId, setEventId] = useState('')
    const role = useSelector(state => state.idReducer.role.role);
    useEffect(() => {
        if (role && role === 'admin') {
            fetchEvents();
        }
    }, [role]);
    const fetchEvents = async () => {
        try {
            const response = await fetch(`/api/v1/events/getAll`, {
                method: 'GET',
                headers: {
                    'Content-type': 'aplication/json'
                },
            });
            const result = await response.json();
            if (result.status === 'success') {
                console.log(result.data.events);
                setEvents(result.data.events)
            }
        } catch (err) {
            return console.log(err);
        }
    }
    const removeEvent = async () => {
        try {
            const response = await fetch(`/api/v1/events/delete/${eventId}`, {
                method: 'DELETE',
                headers: {
                    'Content-type': 'application/json'
                },
                credentials: 'include'
            });
            console.log(response);
            if (response.status === 204) {
                const filter = events.filter(element => element._id !== eventId)
                setEvents(filter)
                setToggle(false)
            }
        } catch (err) {
            return console.log(err);
        }
    }
    return (
        <div id="manage_events">
            {role && role === 'admin' ? <>
                <div>
                    <button><Link to='/eventForm'>Create Event</Link></button>
                </div>
                <div>
                    {events && <div>
                        {events && events.map((element, i) => {
                            let date = formatDate(new Date(element.date).toLocaleDateString('en-GB'))
                            return (
                                <div key={i} id="event_card" >
                                    <a href={`/eventForm/${element._id}`}> <div id="event_picture" style={{ backgroundImage: `url(/img/event/${element.picture})` }}></div></a>
                                    <div id="event_info">
                                        <p>{element.name}</p>
                                        <p>{date}</p>
                                        <div id="details">
                                            <p>{element.details}</p>
                                        </div>
                                        <div id="bottom_card">
                                            <p>{element.location}</p>
                                            <button onClick={() => {
                                                setToggle(true);
                                                setEventId(element._id)
                                            }}>Delete Event</button>
                                        </div>
                                    </div>
                                </div>
                            )
                        })}

                    </div>}
                </div>
                {toggle ? <DeletePopUp id={eventId} toggl={() => setToggle(false)} func={removeEvent} /> : null}
            </> : null}

        </div>
    )
}