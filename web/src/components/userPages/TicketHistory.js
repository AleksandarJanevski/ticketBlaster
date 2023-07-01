import React, { useState, useEffect } from "react";
import { useSelector } from 'react-redux'
import { formatDate } from '../functions/functions'

export const TicketHistory = () => {
    const [tickets, setTickets] = useState([])
    const id = useSelector(state => state.idReducer.id.id)
    useEffect(() => {
        getTickets()
    }, [])
    const getTickets = async () => {
        try {
            const response = await fetch(`/api/v1/ecommerce/order/${id}`, {
                method: 'GET',
                headers: {
                    'Content-type': 'aplication/json'
                },
                credentials: 'include'
            });
            const result = await response.json();
            if (result.status === 'success') {
                setTickets(result.data.orders)
                console.log(result.data.orders);
            }
        } catch (err) {
            return console.log(err);
        }
    }
    return (
        <div id="ticket_history">
            {tickets && tickets.map((element, i) => {
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
                                <button id="getTickets"><a href={`/user/ticketHistory/${element._id}`}>Print</a></button>
                            </div>
                        </div>
                    </div>
                )
            })}
        </div>
    )
}