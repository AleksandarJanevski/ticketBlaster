import React, { useEffect, useState } from "react";
import { formatDate } from '../functions/functions';
import { useSelector, useDispatch } from 'react-redux'
import { getConcerts, getStandUp } from '../../redux/actions/eventsActions';
import { Link } from "react-router-dom";
import { DeletePopUp } from "./DeletePopUp";

export const ManageEvents = () => {
    const [events, setEvents] = useState([]);
    const [toggle, setToggle] = useState(false)
    const [eventId, setEventId] = useState('')
    const dispatch = useDispatch()
    const concerts = useSelector(state => state.eventsReducer.concerts);
    const standUp = useSelector(state => state.eventsReducer.standUp)
    const role = useSelector(state => state.userReducer.user.role);
    useEffect(() => {
        if (role && role === 'admin') {
            const arr = [...concerts].concat([...standUp]);
            arr.sort((a, b) => { return a.date - b.date })
            setEvents(arr)
        }
    }, [role, concerts, standUp]);
    const removeEvent = async () => {
        try {
            const response = await fetch(`/api/v1/events/delete/${eventId}`, {
                method: 'DELETE',
                headers: {
                    'Content-type': 'application/json'
                },
                credentials: 'include'
            });
            if (response.status === 204) {
                const filter = events.filter(element => element._id !== eventId)
                const updateEvents = events.filter(element => element._id === eventId);
                console.log(updateEvents);
                if (updateEvents.category === 'Musical Concert') {
                    let arr = [...concerts]
                    arr = arr.filter(element => element !== updateEvents[0])
                    dispatch(getConcerts(arr));
                } else {
                    let arr = [...standUp]
                    arr = arr.filter(element => element !== updateEvents[0])
                    dispatch(getStandUp(arr));
                }
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