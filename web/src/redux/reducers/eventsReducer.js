import { GET_CONCERTS, GET_STANDUP, GET_HERO } from '../constants/eventsConst'
const initialState = {
    concerts: [],
    standUp: [],
    hero: {}
}
export const eventsReducer = (state = initialState, action) => {
    switch (action.type) {
        case GET_CONCERTS:
            return {
                ...state,
                concerts: action.payload
            }
        case GET_STANDUP:
            return {
                ...state,
                standUp: action.payload
            }
        case GET_HERO:
            return {
                ...state,
                hero: action.payload
            };
        default: return state
    }
}