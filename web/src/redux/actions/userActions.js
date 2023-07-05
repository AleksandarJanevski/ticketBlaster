import { GET_BASKET, GET_USER, GET_TICKETS } from "../constants/userConstants";

export const getUser = (data) => {
    return {
        type: GET_USER,
        payload: data
    }
}
export const getBasket = (data) => {
    return {
        type: GET_BASKET,
        payload: data
    }
}
export const getTickets = (data) => {
    return {
        type: GET_TICKETS,
        payload: data
    }
}