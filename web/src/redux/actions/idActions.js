import { GET_ID, GET_ROLE } from '../constants/idConstants'
export const idActions = (id) => {
    return {
        type: GET_ID,
        payload: {
            id: id,
        }
    }
}
export const roleActions = (role) => {
    return {
        type: GET_ROLE,
        payload: {
            role: role,
        }
    }
}