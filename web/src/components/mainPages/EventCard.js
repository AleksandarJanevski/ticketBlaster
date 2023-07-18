import React from "react";
import PropTypes from 'prop-types'
import { formatDate } from '../functions/functions'
import { Link } from "react-router-dom";
export const EventCard = ({ array, option, load, func, setOne, setTwo, id }) => {
    const buttonType = (option, element) => {
        switch (option) {
            case 1:
                if (element.tickets === 0) {
                    return (<button id="getTickets" style={{ color: 'white' }}>Sold Out</button>)
                } else {
                    return (<Link id="getTicketsAnchor" to={`/event/${element._id}`}><button id="getTickets">Get Tickets</button></Link>);
                }
            case 2:
                return (<button onClick={() => {
                    setOne(true);
                    setTwo(element._id)
                }}>Delete Event</button>)
            case 3:
                return (<button id="removeRelated" onClick={() => func(element)}>Remove</button>);
            default:
                break;
        }
    }
    return (
        <div id="card">
            {array && array.map((element, i) => {
                let date = formatDate(new Date(element.date).toLocaleDateString('en-GB'))
                if (i >= load) return null
                return (
                    <div key={i} id={id} >
                        {option === 2 ? <Link to={`/eventForm/${element._id}`}> <div id="event_picture" style={{ backgroundImage: `url(/img/event/${element.picture})` }}></div></Link> : <div id="event_picture" style={{ backgroundImage: `url(/img/event/${element.picture})` }}>
                        </div>}
                        <div id="event_info">
                            <div id="event_name_location">
                                <p>{element.name}</p>
                                <p>{date}</p>
                            </div>
                            <div id="details">
                                <p>{element.details}</p>
                            </div>
                            <div id="bottom_card">
                                <p>{element.location}</p>
                                {buttonType(option, element, func)}
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