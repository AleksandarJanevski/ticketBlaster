import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";

export const Events = () => {
    const [hero, setHero] = useState({});
    const concerts = useSelector(state => state.eventsReducer.concerts);
    const standUp = useSelector(state => state.eventsReducer.standUp);
    useEffect(() => {
        getHero();
    }, []);

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
            concerts = concerts.filter(element => element !== result.data.hero);
            standUp = standUp.filter(element => element !== result.data.hero);

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
            if (day.startsWith(0)) {
                day = day.slice(1);
            }
            if (lastDigit === 1) {
                day = day + "st"
            } else if (lastDigit === 2) {
                day = day + "nd"
            } else if (lastDigit === 3) {
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
            <div id="hero">

            </div>
            {concerts && concerts.map((element, i) => {
                let date = formatDate(new Date(element.date).toLocaleDateString('en-GB'))
                return (
                    <span key={i}>
                        <p>{element.name}</p>
                        <p>{element.details}</p>
                        <p>{element.price}</p>
                        <p>{date}</p>
                    </span>
                )
            })}
            <hr />
            {standUp && standUp.map((element, i) => {
                let date = formatDate(new Date(element.date).toLocaleDateString('en-GB'))
                return (
                    <span key={i}>
                        <p>{element.name}</p>
                        <p>{element.name}</p>
                        <p>{element.details}</p>
                        <p>{element.price}</p>
                        <p>{date}</p>
                    </span>
                )
            })}
            <h1>Hello</h1>
        </div>
    )
}