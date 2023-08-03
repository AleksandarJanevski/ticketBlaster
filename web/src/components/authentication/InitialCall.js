import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  getConcerts,
  getStandUp,
  getHero,
} from "../../redux/actions/eventsActions";
import { redux } from "../utils/reusableFunctions";
import {
  getUser,
  getBasket,
  getTickets,
} from "../../redux/actions/userActions";

export const InitialCall = () => {
  const concerts = useSelector((state) => state.eventsReducer.concerts);
  const standUp = useSelector((state) => state.eventsReducer.standUp);
  const hero = useSelector((state) => state.eventsReducer.hero);
  const user = useSelector((state) => state.userReducer.user);
  const cart = useSelector((state) => state.userReducer.basket);
  const tickets = useSelector((state) => state.userReducer.tickets);
  const [fetched, setFetched] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    if (concerts.length < 1 && standUp.length < 1 && hero) {
      fetchEvents();
    }
  }, []);
  useEffect(() => {
    if (!user.fullName) {
      fetchUser();
    }
  }, [user]);
  useEffect(() => {
    if (user.fullName && !fetched) {
      fetchCart();
      fetchTickets();
      setFetched(true);
    }
  }, [user]);

  const fetchCart = async () => {
    await redux("/api/v1/ecommerce/basket", dispatch, getBasket, 1);
  };
  const fetchUser = async () => {
    await redux(`/api/v1/users/one`, dispatch, getUser, 2);
  };
  const fetchTickets = async () => {
    await redux(`/api/v1/ecommerce/order`, dispatch, getTickets, 3);
  };
  const fetchEvents = async () => {
    await redux(
      "/api/v1/events",
      dispatch,
      getHero,
      4,
      getStandUp,
      getConcerts
    );
  };
};
