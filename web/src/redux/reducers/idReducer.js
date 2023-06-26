import { GET_ID, GET_ROLE } from '../constants/idConstants'
const initialState = {
    id: "",
    role: "",
}

export const idReducer = (state = initialState, action) => {
    switch (action.type) {
        case GET_ID:
            return {
                ...state,
                id: action.payload,
            }
        case GET_ROLE:
            return {
                ...state,
                role: action.payload
            }
        default: return state
    }
}