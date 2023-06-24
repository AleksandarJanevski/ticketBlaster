import { GET_CONCERTS, GET_STANDUP } from '../constants/eventsConst'
const initialState = {
    concerts: [],
    standUp: []
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
        default: return state
    }
}