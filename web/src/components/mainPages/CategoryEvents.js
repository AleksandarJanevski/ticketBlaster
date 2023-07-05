import React from "react";
import { useParams } from 'react-router-dom'
import { EventCard } from "./EventCard";
import { useSelector } from "react-redux";

export const CategoryEvents = () => {
    const { type } = useParams()
    const concerts = useSelector(state => state.eventsReducer.concerts);
    const standUp = useSelector(state => state.eventsReducer.standUp);
    return (
        <div id="category_events">
            <h1>{type === 'musicalConcerts' ? 'Musical Concerts' : "Stand-up Comedy"}</h1>
            <div id="category_list">
                <EventCard array={type === 'musicalConcerts' ? concerts : standUp} option={1} />
            </div>
        </div>
    )
}