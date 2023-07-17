import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from 'react-redux'
import { getConcerts, getHero, getStandUp } from '../../redux/actions/eventsActions';
import { Link } from "react-router-dom";
import { DeletePopUp } from "./DeletePopUp";
import { EventCard } from "../mainPages/EventCard";

export const ManageEvents = () => {
    const [events, setEvents] = useState([]);
    const [toggle, setToggle] = useState(false)
    const [eventId, setEventId] = useState('')
    const dispatch = useDispatch()
    const concerts = useSelector(state => state.eventsReducer.concerts);
    const standUp = useSelector(state => state.eventsReducer.standUp);
    const hero = useSelector(state => state.eventsReducer.hero);
    const role = useSelector(state => state.userReducer.user.role);
    useEffect(() => {
        if (role && role === 'admin') {
            const arr = [...concerts].concat([...standUp]);
            arr.sort((a, b) => { return a.date - b.date })
            setEvents(arr)
        } else {
            window.location.href = '/'
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
                    console.log(hero, arr[0]);
                    if (eventId === hero._id) {
                        dispatch(getHero(arr.slice(0, 1)));//fix this
                    }
                    dispatch(getConcerts(arr));
                } else {
                    let arr = [...standUp]
                    arr = arr.filter(element => element !== updateEvents[0])
                    console.log(hero, arr[0]);
                    if (eventId === hero._id) {
                        dispatch(getHero(arr.slice(0, 1)));
                    }
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
            {role && role === 'admin' ?
                <div id="manage_one">
                    {events && <EventCard id={'manage_event_card'} array={events} option={2} setOne={setToggle} setTwo={setEventId} func={removeEvent} />}
                    {/* needs custom card */}
                </div> : null}
            {toggle ? <DeletePopUp id={eventId} toggl={() => setToggle(false)} func={removeEvent} /> : null}
        </div>
    )
}