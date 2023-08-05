import {
  GET_BASKET,
  GET_USER,
  GET_TICKETS,
  LOG_OUT,
} from "../constants/userConstants";

export const getUser = (data) => {
  return {
    type: GET_USER,
    payload: data,
  };
};
export const getBasket = (data) => {
  return {
    type: GET_BASKET,
    payload: data,
  };
};
export const getTickets = (data) => {
  return {
    type: GET_TICKETS,
    payload: data,
  };
};
export const logOut = () => {
  return {
    type: LOG_OUT,
  };
};
