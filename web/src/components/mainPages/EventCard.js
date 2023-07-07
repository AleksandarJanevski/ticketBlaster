import React from "react";
import PropTypes from 'prop-types'
import { formatDate } from '../functions/functions'
import { Link } from "react-router-dom";
export const EventCard = ({ array, option, func, setOne, setTwo }) => {
    const buttonType = (option, element) => {
        switch (option) {
            case 1:
                return (<button id="getTickets"><Link to={`/event/${element._id}`}>Get Tickets</Link> </button>);
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
                return (
                    <div key={i} id='event_card' >
                        {option === 2 ? <a href={`/eventForm/${element._id}`}> <div id="event_picture" style={{ backgroundImage: `url(/img/event/${element.picture})` }}></div></a> : <div id="event_picture" style={{ backgroundImage: `url(/img/event/${element.picture})` }}>
                        </div>}

                        <div id="event_info">
                            <p>{element.name}</p>
                            <p>{date}</p>
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