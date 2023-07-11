import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { EventCard } from "./EventCard";
import { formatDate } from "../functions/functions";
import { Link } from "react-router-dom";

export const Events = () => {
    const concerts = useSelector(state => state.eventsReducer.concerts);
    const standUp = useSelector(state => state.eventsReducer.standUp);
    const hero = useSelector(state => state.eventsReducer.hero);
    const [standUpFilter, setStandUpFilter] = useState([]);
    const [concertFilter, setConcertFilter] = useState([]);
    useEffect(() => {
        setStandUpFilter(standUp.filter(element => element.name !== hero.name));
        setConcertFilter(concerts.filter(element => element.name !== hero.name))
    }, [hero, concerts, standUp])

    return (
        <div id="events">
            {hero && <div style={{ backgroundImage: `url(/img/event/${hero.picture})` }} id="hero">
                <div id="hero_name">
                    <p>{hero.name}</p>
                </div>
                <div id="hero_info">
                    <p>{formatDate(new Date(hero.date).toLocaleDateString('en-GB'), true)}, {hero.location}</p>
                    <button id="hero_button"><Link to={`/event/${hero._id}`}>Get Tickets</Link></button>
                </div>
            </div>}
            <div id="eventList">
                <div className="vertical">
                    <h2>Musical Concerts</h2>
                    {concertFilter && <EventCard array={concertFilter} option={1} load={5} />}
                    <Link className="showMore" to="/category/musicalConcerts"><div >See All Musical Concerts</div></Link>
                </div>
                <div className="vertical">
                    <h2>Stand-up Comedy</h2>
                    {standUpFilter && <EventCard array={standUpFilter} option={1} load={5} />}
                    <Link className="showMore" to="/category/standUpComedy"><div >See All Stand-up Comedy Shows</div></Link>
                </div>
            </div>
        </div>
    )
}