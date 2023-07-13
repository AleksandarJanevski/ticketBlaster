import React, { useEffect, useState } from "react";
import { useParams } from 'react-router-dom'
import { formatDate } from '../functions/functions'
import { EventCard } from "./EventCard";
import { useSelector, useDispatch } from 'react-redux'
import { getBasket } from "../../redux/actions/userActions";

export const SingleEvent = () => {
    const dispatch = useDispatch();
    const [event, setEvent] = useState({});
    const [amount, setAmount] = useState(1);
    const concerts = useSelector(state => state.eventsReducer.concerts);
    const standUp = useSelector(state => state.eventsReducer.standUp);
    const role = useSelector(state => state.userReducer.user.role);
    const user = useSelector(state => state.idReducer.id.id);
    const [toggle, setToggle] = useState(false);
    const { id } = useParams();
    useEffect(() => {
        if (id && event._id !== id) {
            getEvent();
        }
    }, [concerts, standUp, id]);
    useEffect(() => {
        if (toggle) {
            getRelated();
            setToggle(!toggle);
        }
    }, [toggle])
    const getEvent = () => {
        let events = [...concerts].concat([...standUp]);
        let filter = events.filter(element => element._id === id);
        setEvent(filter[0]);
        setToggle(!toggle);
    }
    const getRelated = () => {
        let events = [...concerts].concat([...standUp]);
        let obj = { ...event }
        const filterRelated = events.filter(element => obj.relatedEvents.some(item => item === element._id));
        setEvent({ ...event, relatedEvents: filterRelated });
    }

    const maxTickets = () => {
        if (event.tickets < 4) {
            return event.tickets;
        } else if (event.tickets === 0) {
            return 0;
        } else {
            return 4;
        }
    }
    const addToCart = async () => {
        try {
            if (!role) {
                return alert('Please log in or create an account to continue this action');
            }
            if (event.tickets < amount) {
                return alert('No ticekts available');
            }
            const response = await fetch(`/api/v1/ecommerce/basket/${user}`, {
                method: 'POST',
                body: JSON.stringify({
                    amount: amount,
                    event: id
                }),
                headers: {
                    'content-type': 'application/json'
                }
            })
            const result = await response.json();
            if (result.status === 'success') {
                dispatch(getBasket({
                    amount: amount,
                    event: id
                }))
                window.location.href = '/cart'
            }
        } catch (err) {
            return console.log(err);
        }
    }
    return (
        <div id="single_event">
            {event && <>
                <div id="single_event_top">
                    <p>{event.name}</p>
                    <p>{formatDate(new Date(event.date).toLocaleDateString('en-GB'))}</p>
                    <p>{event.location}</p>
                </div>
                <div id="single_event_mid" >
                    <img src={`http://localhost:9000/img/event/${event.picture}`} alt="" />
                    <div id="single_event_right">
                        <p id="about">About</p>
                        <p>{event.details}</p>
                        <span id="price">
                            Tickets <p>${event.price} USD</p>
                        </span>
                        <span id="ticket_number">
                            <input type="number" value={amount} max={maxTickets()} min={1} onChange={(e) => { setAmount(e.target.value) }} />
                            <button type="button" onClick={addToCart}>Add to cart</button>
                        </span>
                    </div>
                </div>
                <div id="single_event_bottom" >
                    <h1>Related Acts</h1>
                    <span id="relatedActs">
                        {event.relatedEvents && <EventCard id={'event_card'} array={event.relatedEvents.slice(0, 1)} option={1} load={1} />}
                        {event.relatedEvents && <EventCard id={'event_card'} array={event.relatedEvents.slice(1, 2)} option={1} load={1} />}
                    </span>

                </div>
            </>}
        </div>

    )
}