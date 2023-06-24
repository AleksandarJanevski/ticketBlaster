import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getConcerts, getStandUp } from '../redux/actions/eventsActions';

export const FetchCall = () => {
    const concerts = useSelector(state => state.eventsReducer.concerts);
    const standUp = useSelector(state => state.eventsReducer.standUp);
    useEffect(() => {
        if (concerts.length < 1 && standUp.length < 1) {
            fetchConcerts();
            fetchStandUp();
        }
    })
    const dispatch = useDispatch();
    const fetchConcerts = async () => {
        try {
            const response = await fetch('/api/v1/events/concerts', {
                method: 'GET',
                headers: {
                    'Content-type': 'aplication/json'
                },
            });
            const result = await response.json()
            if (result.status === 'success') {
                dispatch(getConcerts(result.data.events));
            }
        } catch (err) {
            return console.log(err);
        }
    }
    const fetchStandUp = async () => {
        try {
            const response = await fetch('/api/v1/events/standUp', {
                method: 'GET',
                headers: {
                    'Content-type': 'aplication/json'
                },
            });
            const result = await response.json();
            if (result.status === 'success') {
                dispatch(getStandUp(result.data.events));
            }
        } catch (err) {
            return console.log(err);
        }
    }
}