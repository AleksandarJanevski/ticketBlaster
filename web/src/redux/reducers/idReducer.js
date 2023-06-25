import { GET_ID } from '../constants/idConstants'
const initialState = {
    id: "",
    role: "",
    token: ""
}

export const idReducer = (state = initialState, action) => {
    switch (action.type) {
        case GET_ID:
            return {
                ...state,
                id: action.payload,
                role: action.payload,
            }
        default: return state
    }
}