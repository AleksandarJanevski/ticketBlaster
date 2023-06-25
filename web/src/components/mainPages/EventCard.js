import React from "react";
import PropTypes from 'prop-types'

export const EventCard = ({ array, funkcija }) => {
    return (
        <div id="card">
            {array && array.map((element, i) => {
                let date = funkcija(new Date(element.date).toLocaleDateString('en-GB'))
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
    funkcija: PropTypes.func.isRequired,
}