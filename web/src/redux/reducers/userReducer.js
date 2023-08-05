import {
  GET_USER,
  GET_BASKET,
  GET_TICKETS,
  LOG_OUT,
} from "../constants/userConstants";

const initialState = {
  basket: [],
  tickets: [],
  user: {},
};

export const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_USER:
      return {
        ...state,
        user: action.payload,
      };
    case GET_BASKET:
      return {
        ...state,
        basket: action.payload,
      };
    case GET_TICKETS:
      return {
        ...state,
        tickets: action.payload,
      };
    case LOG_OUT:
      return initialState;
    default:
      return state;
  }
};
