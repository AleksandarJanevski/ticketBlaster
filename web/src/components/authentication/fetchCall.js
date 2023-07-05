import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getConcerts, getStandUp, getHero } from '../../redux/actions/eventsActions';
import { fetchEvents, redux } from '../functions/functions'
import { getUser, getBasket, getTickets } from "../../redux/actions/userActions";
import { idActions } from "../../redux/actions/idActions";

export const FetchCall = () => {
    const concerts = useSelector(state => state.eventsReducer.concerts);
    const standUp = useSelector(state => state.eventsReducer.standUp);
    const hero = useSelector(state => state.eventsReducer.hero);
    const id = useSelector(state => state.idReducer.id.id);
    const dispatch = useDispatch();
    useEffect(() => {
        if (!id) {
            getId()
        }
        if (concerts.length < 1 && standUp.length < 1 && hero) {
            fetchConcerts();
            fetchStandUp();
            fetchHero();
        }
    }, [])
    useEffect(() => {
        if (id) {
            fetchCart()
            fetchUser()
            fetchTickets()
        }
    }, [id]);

    const getId = async () => {
        await redux('/api/v1/auth', dispatch, idActions, 5)
    }
    const fetchConcerts = async () => {
        await fetchEvents(dispatch, getConcerts, 'concerts')
    }
    const fetchStandUp = async () => {
        await fetchEvents(dispatch, getStandUp, 'standUp');
    }
    const fetchHero = async () => {
        await redux('/api/v1/events/hero', dispatch, getHero, 4);
    }
    const fetchCart = async () => {
        await redux(`/api/v1/ecommerce/basket/${id}`, dispatch, getBasket, 1);
    }
    const fetchUser = async () => {
        await redux(`/api/v1/users/${id}`, dispatch, getUser, 2);
    }
    const fetchTickets = async () => {
        await redux(`/api/v1/ecommerce/order/${id}`, dispatch, getTickets, 3)
    }

}