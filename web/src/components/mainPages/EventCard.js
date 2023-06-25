import React from "react";
import PropTypes from 'prop-types'

export const EventCard = ({ array }) => {
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
        <div id="card">
            {array && array.map((element, i) => {
                let date = formatDate(new Date(element.date).toLocaleDateString('en-GB'))
                return (
                    <div key={i} id="event_card" >
                        <div id="event_picture" style={{ backgroundImage: `url(/img/event/${element.picture})` }}>
                        </div>
                        <div id="event_info">
                            <p>{element.name}</p>
                            <p>{date}</p>
                            <div id="details">
                                <p>{element.details}</p>
                            </div>
                            <div id="bottom_card">
                                <p>{element.location}</p>
                                <button id="getTickets"><a href={`/event/${element._id}`}>Get Tickets</a></button>
                            </div>
                        </div>
                    </div>
                )
            })}
        </div>
    )
}

EventCard.propTypes = {
    array: PropTypes.array.isRequired,
}