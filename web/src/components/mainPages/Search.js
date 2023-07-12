import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { formatDate } from '../functions/functions'
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { EventCard } from "./EventCard";

export const Search = () => {
    const [query, setQuery] = useState([]);
    const concerts = useSelector(state => state.eventsReducer.concerts);
    const standUp = useSelector(state => state.eventsReducer.standUp);
    let param = useLocation().search.replaceAll('+', ' ').replace('?keyword=', '');

    useEffect(() => {
        if (param) {
            find();
        }
    }, [param, concerts, standUp]);

    const find = () => {
        try {
            let keyword = param.toLowerCase();
            let events = [...concerts].concat([...standUp])
            let search = events.filter(element => element.details.toLowerCase().includes(keyword) || element.name.toLowerCase().includes(keyword) || element.location.toLowerCase().includes(keyword));
            setQuery(search);
        } catch (err) {
            return console.log(err);
        }
    }
    return (
        <div id="search_results">
            <h1>Search Results for : {param}</h1>
            {query && <EventCard array={query} option={1} />}
        </div>

    )
}
{/* <div>
                {query.map((element, i) => {
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
                                    <button id="getTickets"><Link to={`/event/${element._id}`}>Get Tickets</Link></button>
                                </div>
                            </div>
                        </div>
                    )
                })}

            </div> */}