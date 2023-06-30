import React from "react";
import PropTypes from 'prop-types'
import { formatDate } from '../functions/functions'
export const EventCard = ({ array, option, func }) => {
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
                                {[1, 3].includes(option) ? <button id="getTickets">{option === 1 ? <a href={`/eventForm/${element._id}`}>Get Tickets</a> : <a href={`http://localhost:9000/api/v1/events/delete/${element._id}`}>Delete Event</a>}</button> : <button id="removeRelated" onClick={() => func(element)}>Remove</button>}

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
    option: PropTypes.number.isRequired,
    func: PropTypes.func
}