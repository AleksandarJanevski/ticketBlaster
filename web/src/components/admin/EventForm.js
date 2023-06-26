import React, { useState, useEffect } from "react";
import { useParams } from 'react-router-dom'
import { Dropdown } from "./Dropdown";
import { useSelector } from 'react-redux'
import { EventCard } from "../mainPages/EventCard";
import { preview, verifyData, uploadFunc } from '../functions/functions';

export const EventForm = () => {
    const { eventId } = useParams();
    const concerts = useSelector(state => state.eventsReducer.concerts);
    const standUp = useSelector(state => state.eventsReducer.standUp);
    const [image, setImage] = useState('');
    const [sent, setSent] = useState(false);
    const [previewPic, setPreviewPic] = useState('')
    const [matching, setMatching] = useState([])
    const [related, setRelated] = useState('')
    const [event, setEvent] = useState({
        name: '',
        category: '',
        details: '',
        location: '',
        picture: '',
        date: '',
        price: 0,
        tickets: 0,
        relatedEvents: []
    })
    useEffect(() => {
        if (eventId) {
            getEvent();
        }
    }, []);

    useEffect(() => {
        if (!eventId && sent) {
            createEvent();
        } else if (sent) {
            updateEvent();
        }
    }, [sent]);

    const getEvent = async () => {
        try {
            const response = await fetch(`/api/v1/events/${eventId}`, {
                method: 'GET',
                headers: {
                    'Content-type': 'aplication/json'
                },
                credentials: 'include'
            });
            const result = await response.json();
            if (result.status === 'success') {
                setEvent(result.data.event);
                setMatching(result.data.event.relatedEvents);
            }
        } catch (err) {
            return console.log(err);
        }
    }
    const handleUpload = async () => {
        await uploadFunc(previewPic, event.picture, setEvent, event, setSent, sent, 'event');
    }
    const createEvent = async () => {
        try {
            const response = await fetch('/api/v1/events', {
                method: 'POST',
                body: JSON.stringify(event),
                headers: {
                    'content-type': 'application/json'
                },
                credentials: 'include'
            });
            const result = await response.json()
            console.log(result);
            if (result.status === 'success') {
                window.location.href = '/eventForm';
            }

        } catch (err) {
            console.log(err);
        }
    };
    const updateEvent = async () => {
        try {
            verifyData(event);
            const response = await fetch(`/api/v1/events/${eventId}`, {
                method: 'PATCH',
                body: JSON.stringify(event),
                headers: {
                    'content-type': 'application/json'
                },
                credentials: 'include'
            });
            const result = await response.json();
            console.log(result);
            if (result.status === 'success') {
                window.location.href = `/events/${eventId}`
            }
        } catch (err) {
            return console.log(err);
        }

    }
    const picturePreview = (e) => {
        preview(e, setPreviewPic, setImage);
    };
    const addArray = (e) => {
        e.preventDefault()
        const array = [...event.relatedEvents]
        array.push(related)
        console.log(array);
        concerts.forEach(element => {
            if (array.includes(element._id)) {
                console.log(element);
                matching.push(element)
            }
        });
        console.log(matching);
        standUp.forEach(element => {
            if (array.includes(element._id)) {
                matching.push(element)
            }
        })
        setEvent({ ...event, relatedEvents: array });

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
                        <option value=""></option>
                        <option value="Musical Concert">Musical Concert</option>
                        <option value="Stand-up Comedy">Stand-up Comedy</option>
                    </select>
                </span>
                <span>
                    <label htmlFor="">Date</label>
                    <input type="date" name="date" className="formInput" required value={event.date ? new Date(event.date).toISOString().split('T')[0] : ''} onChange={(e) => { setEvent({ ...event, date: e.target.value }) }} />
                </span>
            </div>
            <div id="eForm2">
                <span id="eventArt">
                    <input type="file" id="fileInput" onChange={picturePreview} accept="image/png, image/jpg, image/jpeg" />
                    {image && <img className="preview" style={{ height: '300px' }} src={image} alt="Preview" />}
                    {eventId && !image && <img className="preview" style={{ height: '300px' }} src={`/img/event/${event.picture}`} alt="Cant reach" />}
                </span>
                <span id="eventDetails">
                    <label htmlFor="">Event Details</label>
                    <input type="text" id="inputDetails" value={event.details} onChange={(e) => { setEvent({ ...event, details: e.target.value }) }} required />

                    <label htmlFor="">Ticket Price</label>
                    <input type="number" required value={event.price} onChange={(e) => { setEvent({ ...event, price: e.target.value }) }} />
                    <label htmlFor="">Ticket Amount</label>
                    <input type="number" required value={event.tickets} onChange={(e) => { setEvent({ ...event, tickets: e.target.value }) }} name="amount" min={1} max={5000} />
                    <label htmlFor="">Location</label>
                    <input type="text" required value={event.location} onChange={(e) => { setEvent({ ...event, location: e.target.value }) }} />
                </span>
            </div>
            <div id="eForm3">
                <label htmlFor="">Related Events</label>
                <span>
                    {event.category === 'Musical Concert' ?
                        <Dropdown elements={concerts} onChange={(e) => { setRelated(e.target.value) }} />
                        :
                        <Dropdown elements={standUp} onChange={(e) => { setRelated(e.target.value) }} />}
                    <button onClick={addArray}>Add</button>
                </span>
                <span id="relatedEvents">
                    {event.relatedEvents ? <EventCard array={matching} /> : null}
                </span>
            </div>
            <button type="button" onClick={handleUpload}>Save</button>
        </div>
    )
}