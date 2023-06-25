import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { EventCard } from "./EventCard";

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
    }, [hero])
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
    const formatDate = (date) => {
        try {
            const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
            let day = date.split('/')[0]
            let lastDigit = parseInt(day.slice(1));
            let month = date.split('/')[1]
            let year = date.split('/')[2]
            if (day.startsWith('0')) {
                day = day.slice(1);
            }
            console.log(lastDigit);
            const exceptions = '11 12 13'
            if (lastDigit === 1 && day !== 11) {
                day = day + "st"
            } else if (lastDigit === 2 && day !== 12) {
                day = day + "nd"
            } else if (lastDigit === 3 && day !== 13) {
                day = day + "rd"
            } else {
                day = day + "th"
            }
            month = months[month - 1]
            return (`${month} ${day}, ${year}`)
        } catch (err) {
            console.log(err);
        }
    }
    return (
        <div id="events">
            <div style={{ backgroundImage: `url(/img/event/${hero.picture})` }} id="hero">
                <div id="hero_name">
                    <p>{hero.name}</p>
                </div>
                <div id="hero_info">
                    <p>{formatDate(new Date(hero.date).toLocaleDateString('en-GB'))}, {hero.location}</p>
                </div>
            </div>
            <div id="eventList">
                <div class="vertical">
                    <h2>Musical Concerts</h2>
                    <EventCard array={concertFilter} funkcija={formatDate} />
                </div>
                <div class="vertical">
                    <h2>Stand-up Comedy</h2>
                    <EventCard array={standUpFilter} funkcija={formatDate} />
                </div>
            </div>
        </div>
    )
}