import { GET_CONCERTS, GET_STANDUP } from '../constants/eventsConst'

export const getConcerts = (event) => {
    return {
        type: GET_CONCERTS,
        payload: event
    }
}
export const getStandUp = (event) => {
    return {
        type: GET_STANDUP,
        payload: event
    }
}