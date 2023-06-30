import React, { useEffect, useState } from "react";
import { formatDate } from '../functions/functions';

export const ManageEvents = () => {
    const [events, setEvents] = useState([]);
    useEffect(() => { fetchEvents() }, []);
    const fetchEvents = async () => {
        try {
            const response = await fetch(`/api/v1/events/getAll`, {
                method: 'GET',
                headers: {
                    'Content-type': 'aplication/json'
                },
            });
            const result = await response.json();
            if (result.status === 'success') {
                console.log(result.data.events);
                setEvents(result.data.events)
            }
        } catch (err) {
            return console.log(err);
        }
    }
    return (
        <div id="manage_events">
            <div>
                <button><a href="/eventForm">Create Event</a></button>
            </div>
            <div>
                {events && <div>
                    {events && events.map((element, i) => {
                        let date = formatDate(new Date(element.date).toLocaleDateString('en-GB'))
                        return (
                            <div key={i} id="event_card" >
                                <a href={`/eventForm/${element._id}`}> <div id="event_picture" style={{ backgroundImage: `url(/img/event/${element.picture})` }}></div></a>
                                <div id="event_info">
                                    <p>{element.name}</p>
                                    <p>{date}</p>
                                    <div id="details">
                                        <p>{element.details}</p>
                                    </div>
                                    <div id="bottom_card">
                                        <p>{element.location}</p>
                                        <button id="getTickets"><a href={`http://localhost:9000/api/v1/events/delete/${element._id}`}>Delete Event</a></button>
                                    </div>
                                </div>
                            </div>
                        )
                    })}

                </div>}
            </div>
        </div>
    )
}