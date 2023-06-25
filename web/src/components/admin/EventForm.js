import React, { useState, useEffect } from "react";
import { useParams } from 'react-router-dom'
import axios from 'axios'

export const EventForm = () => {
    const { eventId } = useParams();
    const [bool, setBool] = useState(false);
    const [image, setImage] = useState('');
    const [sent, setSent] = useState(false);
    const [img, setImg] = useState('')
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
        console.log(event);
    }, []);

    useEffect(() => {
        if (!eventId && sent) {
            console.log('executed');
            createEvent();
        } else if (sent) {
            updateEvent();
        }
    }, [sent]);

    function verifyData(obj) {
        for (let key in obj) {
            if ((typeof obj[key] === 'string' && obj[key].trim() === '') || (obj[key] === null && obj[key] <= 0)) {
                return alert(`Please fill out the ${key} input field`)
            }
        }
    }
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
                setBool(true)
            }
        } catch (err) {
            return console.log(err);
        }
    }
    const upload = async () => {
        try {
            if (img && img !== event.picture) {
                console.log('triggered');
                const upload = await axios.post('/api/v1/upload/event', { picture: img }, {
                    headers: {
                        'content-type': 'multipart/form-data'
                    },
                    credentials: 'include'
                })
                console.log(upload.data.filename);
                const pictureName = upload.data.filename
                setEvent({ ...event, picture: pictureName });
            }
            setSent(!sent)
        } catch (err) {
            return console.log(err);
        }
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
            // if (result.status === 'success') {
            //     window.location.href = '/eventForm';
            // }

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

    const picture = (e) => {
        const file = e.target.files[0]
        console.log(file.name);
        setImg(file);
        if (file) {
            const reader = new FileReader();

            reader.onloadend = () => {
                setImage(reader.result);
            };

            reader.readAsDataURL(file);
        } else {
            setImage('');
        }
    };
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
                    <input type="file" id="fileInput" onChange={picture} accept="image/png, image/jpg, image/jpeg" />
                    {image && <img className="preview" style={{ height: '300px' }} src={image} alt="Preview" />}
                    {bool && !image && <img className="preview" src={`/img/event/${event.picture}`} alt="Cant reach" />}
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
                    {/* DROPDOWN */}
                    <button>Add</button>
                </span>
                <span id="relatedEvents">
                    {/* map */}
                </span>
            </div>
            <button type="button" onClick={upload}>Save</button>
        </div>
    )
}