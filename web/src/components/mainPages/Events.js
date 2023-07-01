import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { EventCard } from "./EventCard";
import { formatDate } from "../functions/functions";

export const Events = () => {
    const [hero, setHero] = useState({});
    const concerts = useSelector(state => state.eventsReducer.concerts);
    const standUp = useSelector(state => state.eventsReducer.standUp);
    const [standUpFilter, setStandUpFilter] = useState([]);
    const [concertFilter, setConcertFilter] = useState([]);
    useEffect(() => {
        getHero();
    }, []);
    useEffect(() => {
        setStandUpFilter(standUp.filter(element => element.name !== hero.name));
        setConcertFilter(concerts.filter(element => element.name !== hero.name))
    }, [hero]);
    const getHero = async () => {
        try {
            const response = await fetch('/api/v1/events/hero', {
                method: 'GET',
                headers: {
                    'Content-type': 'aplication/json'
                },
            });
            const result = await response.json()
            if (result.status === 'success') {
                setHero(result.data.hero);
            }
        } catch (err) {
            return console.log(err);
        }
    }

    return (
        <div id="events">
            {hero && <div style={{ backgroundImage: `url(/img/event/${hero.picture})` }} id="hero">
                <div id="hero_name">
                    <p>{hero.name}</p>
                </div>
                <div id="hero_info">
                    <p>{formatDate(new Date(hero.date).toLocaleDateString('en-GB'))}, {hero.location}</p>
                    <button id="getTickets"><a href={`/event/${hero._id}`}>Get Tickets</a></button>
                </div>
            </div>}
            <div id="eventList">
                <div className="vertical">
                    <h2>Musical Concerts</h2>
                    {concertFilter && <EventCard array={concertFilter} option={1} />}
                </div>
                <div className="vertical">
                    <h2>Stand-up Comedy</h2>
                    {standUpFilter && <EventCard array={standUpFilter} option={1} />}
                </div>
            </div>
        </div>
    )
}