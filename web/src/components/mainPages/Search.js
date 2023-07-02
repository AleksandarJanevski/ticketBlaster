import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { formatDate } from '../functions/functions'

export const Search = () => {
    const [query, setQuery] = useState([]);
    let param = useLocation().search.split('=')[1].replace('+', ' ')
    useEffect(() => { console.log(param); getSearch() }, [param])
    //alternative od reducerite da izvadam i da postavam vo array
    const getSearch = async () => {
        try {
            const response = await fetch(`/api/v1/events/search/${param}`, {
                method: 'GET',
                headers: {
                    'Content-type': 'aplication/json'
                },
                credentials: 'include'
            });
            const result = await response.json();
            if (result.status === 'success') {
                setQuery(result.data.searchQuery)
                console.log(result.data.searchQuery);
            }
        } catch (err) {
            return console.log(err);
        }
    }
    return (
        <div id="search_results">
            <h1>Search Results for : {param}</h1>
            {query && <div>
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
                                    <button id="getTickets"><a href={`http://localhost:9000/api/v1/events/delete/${element._id}`}>Get Tickets</a></button>
                                </div>
                            </div>
                        </div>
                    )
                })}

            </div>}
        </div>

    )
}