import React, { useEffect, useState } from "react";
import { useParams,useNavigate } from "react-router-dom";
import { formatDate } from "../utils/reusableFunctions";
import { EventCard } from "./EventCard";
import { useSelector, useDispatch } from "react-redux";
import { getBasket } from "../../redux/actions/userActions";
import { element } from "prop-types";

export const SingleEvent = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [event, setEvent] = useState({});
  const [amount, setAmount] = useState(1);
  const concerts = useSelector((state) => state.eventsReducer.concerts);
  const standUp = useSelector((state) => state.eventsReducer.standUp);
  const role = useSelector((state) => state.userReducer.user.role);
  const user = useSelector((state) => state.idReducer.id.id);
  const cart = useSelector((state) => state.userReducer.basket);
  const [toggle, setToggle] = useState(false);
  const { id } = useParams();
  useEffect(() => {
    if (id && event._id !== id) {
      getEvent();
    }
  }, [concerts, standUp, id]);
  useEffect(() => {
    if (toggle) {
      getRelated();
      setToggle(!toggle);
    }
  }, [toggle]);
  const getEvent = () => {
    let events = [...concerts].concat([...standUp]);
    let filter = events.filter((element) => element._id === id);
    setEvent(filter[0]);
    setToggle(!toggle);
  };
  const getRelated = () => {
    let events = [...concerts].concat([...standUp]);
    let obj = { ...event };
    const filterRelated = events.filter((element) =>
      obj.relatedEvents.some((item) => item === element._id)
    );
    setEvent({ ...event, relatedEvents: filterRelated });
  };

  const maxTickets = () => {
    if (event.tickets < 4) {
      return event.tickets;
    } else if (event.tickets === 0) {
      return 0;
    } else {
      return 4;
    }
  };
  const addToCart = async () => {
    try {
      if (!role) {
        return alert(
          "Please log in or create an account to continue this action"
        );
      }
      if (event.tickets < amount) {
        return alert("No tickets available");
      }
      if (amount > 4) {
        setAmount(4);
        return alert("Maximum 4 tickets per user");
      }
      const response = await fetch(`/api/v1/ecommerce/basket/${user}`, {
        method: "POST",
        body: JSON.stringify({
          amount: amount,
          event: id,
        }),
        headers: {
          "content-type": "application/json",
        },
      });
      if (response.status === 400) {
        return alert("Exceeded maximum number of tickets");
      }
      const result = await response.json();
      if (result.status === "success") {
        let basket = [...cart]
        const events = [...concerts].concat([...standUp]);
        let existing = basket.findIndex(element=> element.event._id === id);
        console.log(existing)
      if(existing >= 0){
        let num = basket[existing].amount+amount
        basket[existing] = { ...basket[existing], amount: num };
        dispatch(
          getBasket(basket)
        );
        navigate("/cart");
      }else{
        let item = {
          amount: amount,
          beholder: user,
        }
        item.event = events.find(element => element._id === id)
       basket.push(item);
       console.log(basket, events)
        dispatch(
          getBasket(basket)
        );
        navigate("/cart")
      }
        
      }
    } catch (err) {
      return console.error(err);
    }
  };
  return (
    <div id="single_event">
      {event && (
        <>
          <div id="single_event_top">
            <p>{event.name}</p>
            <p>
              {formatDate(new Date(event.date).toLocaleDateString("en-GB"))}
            </p>
            <p>{event.location}</p>
          </div>
          <div id="single_event_mid">
            {event.picture && (
              <img src={`/img/event/${event.picture}`} alt="" />
            )}
            <div id="single_event_right">
              <p id="about">About</p>
              <p>{event.details}</p>
              <span id="price">
                Tickets <p>${event.price} USD</p>
              </span>
              <span id="ticket_number">
                <input
                  type="number"
                  value={amount}
                  max={maxTickets()}
                  min={1}
                  onChange={(e) => {
                    setAmount(e.target.value);
                  }}
                />
                <button type="button" onClick={addToCart}>
                  Add to cart
                </button>
              </span>
            </div>
          </div>
          <div id="single_event_bottom">
            <h1>Related Acts</h1>
            <span id="relatedActs">
              {event.relatedEvents && (
                <EventCard
                  id={"event_card"}
                  array={event.relatedEvents.slice(0, 1)}
                  option={1}
                  load={1}
                />
              )}
              {event.relatedEvents && (
                <EventCard
                  id={"event_card"}
                  array={event.relatedEvents.slice(1, 2)}
                  option={1}
                  load={1}
                />
              )}
            </span>
          </div>
        </>
      )}
    </div>
  );
};
