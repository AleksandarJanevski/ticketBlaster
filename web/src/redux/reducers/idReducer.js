import { GET_ID } from '../constants/idConstants'
const initialState = {
    id: ""
}

export const idReducer = (state = initialState, action) => {
    switch (action.type) {
        case GET_ID:
            return {
                ...state,
                id: action.payload,
            }
        default: return state
    }
}