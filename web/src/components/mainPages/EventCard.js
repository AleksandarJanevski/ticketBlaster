import React from "react";
import PropTypes from 'prop-types'
import { formatDate } from '../functions/functions'
export const EventCard = ({ array, option, func }) => {
    const removeArr = (element) => {
        func(element)
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
                                {option === 1 ? <button id="getTickets"><a href={`/events/${element._id}`}>Get Tickets</a></button> : <button id="removeRelated" onClick={() => removeArr(element)}>Remove</button>}

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