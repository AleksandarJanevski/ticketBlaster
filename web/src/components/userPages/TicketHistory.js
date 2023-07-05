import React, { useState, useEffect } from "react";
import { useSelector } from 'react-redux'
import { formatDate } from '../functions/functions'
import { PrintEvent } from "./PrintEvent";

export const TicketHistory = () => {
    const tickets = useSelector(state => state.userReducer.tickets);
    const [toggle, setToggle] = useState(false)
    const [print, setPrint] = useState({
        name: '',
        date: '',
        location: '',
        image: ''
    });
    useEffect(() => {
        document.addEventListener('keydown', function (e) {
            if (e.key === 'Escape') {
                setToggle(false)
            }
        }, true);
    }, []);
    return (
        <div id="ticket_history">
            {tickets && tickets.map((element, i) => {
                if (element.event) {
                    let date = formatDate(new Date(element.event.date).toLocaleDateString('en-GB'))
                    return (
                        <div key={i} id="event_card" >
                            <div id="event_picture" style={{ backgroundImage: `url(/img/event/${element.event.picture})` }}></div>
                            <div id="event_info">
                                <p>{element.event.name}</p>
                                <p>{date}</p>
                                <div id="details">
                                    <p>{element.event.details}</p>
                                </div>
                                <div id="bottom_card">
                                    <p>{element.event.location}</p>
                                    <button type="button" onClick={() => {
                                        const obj = {
                                            name: element.event.name,
                                            location: element.event.location,
                                            date: date,
                                            image: `/img/event/${element.event.picture}`
                                        }
                                        setPrint(obj);
                                        setToggle(true)
                                    }}>Print</button>
                                </div>
                            </div>
                        </div>
                    )
                }
            })}
            {toggle ? <PrintEvent name={print.name} image={print.image} location={print.location} date={print.date} /> : null}
        </div>
    )
}