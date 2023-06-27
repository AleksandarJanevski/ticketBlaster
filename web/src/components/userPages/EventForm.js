import React, { useState, useEffect } from "react";
import { useParams } from 'react-router-dom'
import { Dropdown } from "./Dropdown";
import { EventCard } from "../mainPages/EventCard";
import { preview, verifyData, uploadFunc, fetchEvents } from '../functions/functions';

export const EventForm = () => {
    const { eventId } = useParams();
    const [concerts, setConcerts] = useState([]);
    const [standUp, setStandUp] = useState([]);
    const [image, setImage] = useState('');
    const [sent, setSent] = useState(false);
    let [t, setT] = useState(0);
    const [previewPic, setPreviewPic] = useState('')
    const [matching, setMatching] = useState([]);
    const [related, setRelated] = useState('')
    const currentDate = new Date().toISOString().split("T")[0];
    const year = currentDate[3]
    const maxDate = currentDate.replace(year, (parseInt(year) + 5))
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
        if (t < 1) {
            fetchConcerts();
            fetchStandUp();
            setT(t += 1)
        }
    }, [event]);

    useEffect(() => {
        if (!eventId && sent) {
            createEvent();
        } else if (sent) {
            updateEvent();
        }
    }, [sent]);
    const fetchConcerts = async () => {
        await fetchEvents('', (data) => {
            if (eventId) {
                const filteredConcerts = data.filter(element => element._id !== eventId && !event.relatedEvents.some(relatedEvent => relatedEvent._id === element._id));
                setConcerts(filteredConcerts);
            } else {
                setConcerts(data)
            }

        }, 'concerts');
    };
    const fetchStandUp = async () => {
        await fetchEvents('', (data) => {
            if (eventId) {
                const filteredStandUp = data.filter(element => element._id !== eventId && !event.relatedEvents.some(item => item._id === element._id));
                setStandUp(filteredStandUp);
            } else {
                setStandUp(data)
            }
        }, 'standUp');
    };

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
        try {
            let valid = verifyData(event, false);
            if (valid) {
                await uploadFunc(previewPic, event.picture, setEvent, event, setSent, sent, 'event');
            }
        } catch (err) {
            alert(err.message)
        }

    }
    const createEvent = async () => {
        try {
            let valid = verifyData(event, true);
            if (valid) {
                const response = await fetch('/api/v1/events', {
                    method: 'POST',
                    body: JSON.stringify(event),
                    headers: {
                        'content-type': 'application/json'
                    },
                    credentials: 'include'
                });
                const result = await response.json()
                if (result.status === 'success') {
                    window.location.href = '/eventForm';
                }
            }

        } catch (err) {
            return console.log(err);
        }
    };
    const updateEvent = async () => {
        try {
            let valid = verifyData(event, true);
            if (valid) {
                verifyData(event, true);
                const response = await fetch(`/api/v1/events/${eventId}`, {
                    method: 'PATCH',
                    body: JSON.stringify(event),
                    headers: {
                        'content-type': 'application/json'
                    },
                    credentials: 'include'
                });
                const result = await response.json();
                if (result.status === 'success') {
                    window.location.href = `/events/${eventId}`
                }
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
        let arr = [...matching]
        if (!array.includes(related) && related !== '') {
            array.push(related)
        }
        concerts.forEach(element => {
            if (array.includes(element._id) && !arr.includes(element) && element !== '') {
                arr.push(element)
            }
        });
        standUp.forEach(element => {
            if (array.includes(element._id) && !arr.includes(element) && element !== '') {
                arr.push(element);
            }
        });
        let filterConcerts = concerts.filter(element => !arr.some(item => item === element));
        let filterStandUp = standUp.filter(element => !arr.some(item => item === element));
        setStandUp(filterStandUp);
        setConcerts(filterConcerts);
        setMatching(arr);
        setEvent({ ...event, relatedEvents: array });
    }
    const unlink = (elem) => {
        let array = [...event.relatedEvents];
        let arr = [...matching];
        if (!eventId) {
            array = array.filter((element) => {
                if (elem._id !== element) {
                    return element
                }
            });
        } else {
            array = array.filter((element) => {
                if (elem._id !== element._id) {
                    return element
                }
            });
        }

        arr = arr.filter((element) => element !== elem);
        let concertArr = [...concerts]
        let standUpArr = [...standUp]
        let bool = false
        if (elem.category === 'Musical Concert') {
            if (!concertArr.some((element) => element._id === elem._id)) {
                concertArr.push(elem);
                bool = true
            }
        } else {
            if (!standUpArr.some((element) => element._id === elem._id)) {
                standUpArr.push(elem);
            }
        }
        if (bool) {
            setConcerts(concertArr)
        } else {
            setStandUp(standUpArr)
        }
        setMatching(arr);
        setEvent({ ...event, relatedEvents: array });
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
                    <input type="date" name="date" min={currentDate} max={maxDate} className="formInput" required value={event.date ? new Date(event.date).toISOString().split('T')[0] : ''} onChange={(e) => { setEvent({ ...event, date: e.target.value }) }} />
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
                    {event.relatedEvents ? <EventCard option={2} array={matching} func={unlink} /> : null}
                </span>
            </div>
            <button type="button" onClick={handleUpload}>Save</button>
        </div>
    );
}