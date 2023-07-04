import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getConcerts, getStandUp, getHero } from '../../redux/actions/eventsActions';
import { fetchEvents } from '../functions/functions'

export const FetchCall = () => {
    const concerts = useSelector(state => state.eventsReducer.concerts);
    const standUp = useSelector(state => state.eventsReducer.standUp);
    const hero = useSelector(state => state.eventsReducer.hero)
    useEffect(() => {
        if (concerts.length < 1 && standUp.length < 1 && hero) {
            fetchConcerts();
            fetchStandUp();
            fetchHero();
        }
    })
    const dispatch = useDispatch();
    const fetchConcerts = async () => {
        await fetchEvents(dispatch, getConcerts, 'concerts')
    }
    const fetchStandUp = async () => {
        await fetchEvents(dispatch, getStandUp, 'standUp');
    }
    const fetchHero = async () => {
        try {
            const response = await fetch('/api/v1/events/hero', {
                method: 'GET',
                headers: {
                    'Content-type': 'aplication/json'
                },
            });
            const result = await response.json()
            if (result.status === 'success') {
                dispatch(getHero(result.data.hero))
            }
        } catch (err) {
            return console.log(err);
        }
    }
}