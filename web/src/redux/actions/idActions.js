import { GET_ID } from '../constants/idConstants'
export const idActions = (id, role) => {
    return {
        type: GET_ID,
        payload: {
            id: id,
            role: role,
        }
    }
}