import { GET_ID } from '../constants/idConstants'
export const idActions = (id) => {
    return {
        type: GET_ID,
        payload: {
            id: id,
        }
    }
}
