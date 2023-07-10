import React, { useEffect, useState } from "react";
import { useParams } from 'react-router-dom'
import { EventCard } from "./EventCard";
import { useSelector } from "react-redux";

export const CategoryEvents = () => {
    const { type } = useParams()
    const concerts = useSelector(state => state.eventsReducer.concerts);
    const standUp = useSelector(state => state.eventsReducer.standUp);
    const [load, setLoad] = useState(6)
    const [num, setNum] = useState(0)
    useEffect(() => {
        if (type === 'musicalConcerts') {
            setNum(concerts.length);
        } else {
            setNum(standUp.length);
        }
        setLoad(6)
    }, [type])
    return (
        <div id="category_events">
            <h1>{type === 'musicalConcerts' ? 'Musical Concerts' : "Stand-up Comedy"}</h1>
            <div id="category_list">
                <EventCard array={type === 'musicalConcerts' ? concerts : standUp} option={1} load={load} />
            </div>
            {load < num ? <button onClick={() => { setLoad(load + 6) }}>Load More {type === 'musicalConcerts' ? 'Musical Concerts' : 'Stand-up Comedy Shows'} </button> : null}
        </div>
    )
}