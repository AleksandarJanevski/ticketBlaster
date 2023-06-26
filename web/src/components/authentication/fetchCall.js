import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getConcerts, getStandUp } from '../../redux/actions/eventsActions';
import { fetchEvents } from '../functions/functions'

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
        await fetchEvents(dispatch, getConcerts, 'concerts')
    }
    const fetchStandUp = async () => {
        await fetchEvents(dispatch, getStandUp, 'standUp');
    }
}