import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  getConcerts,
  getHero,
  getStandUp,
} from "../../../redux/actions/eventsActions";
import { Link } from "react-router-dom";
import { formatDate } from "../../utils/reusableFunctions";
import { DeletePopUp } from "../utils/DeletePopUp";

export const ManageEvents = () => {
  const [events, setEvents] = useState([]);
  const [toggle, setToggle] = useState(false);
  const [eventId, setEventId] = useState("");
  const dispatch = useDispatch();
  const concerts = useSelector((state) => state.eventsReducer.concerts);
  const standUp = useSelector((state) => state.eventsReducer.standUp);
  const hero = useSelector((state) => state.eventsReducer.hero);
  const role = useSelector((state) => state.userReducer.user.role);
  useEffect(() => {
    if (role && role === "admin") {
      let arr = [...concerts].concat([...standUp]);
      arr.sort((a, b) => {
        return new Date(a.date) - new Date(b.date);
      });
      setEvents(arr);
    } else {
      window.location.href = "/";
    }
  }, [role, concerts, standUp]);
  const removeEvent = async () => {
    try {
      const response = await fetch(`/api/v1/events/delete/${eventId}`, {
        method: "DELETE",
        headers: {
          "Content-type": "application/json",
        },
        credentials: "include",
      });
      if (response.status === 204) {
        const filter = events.filter((element) => element._id !== eventId);
        const updateEvents = events.filter(
          (element) => element._id === eventId
        );
        if (hero._id === eventId) {
          dispatch(getHero(filter[0]));
        }
        if (updateEvents[0].category === "Musical Concert") {
          let arr = [...concerts];
          arr = arr.filter((element) => element !== updateEvents[0]);
          dispatch(getConcerts(arr));
        } else {
          let arr = [...standUp];
          arr = arr.filter((element) => element !== updateEvents[0]);
          dispatch(getStandUp(arr));
        }
        setEvents(filter);
        setToggle(false);
      }
    } catch (err) {
      return console.log(err);
    }
  };
  return (
    <div id="manage_events">
      {role && role === "admin" ? (
        <div id="manage_one">
          {events &&
            events.map((element) => {
              let date = formatDate(
                new Date(element.date).toLocaleDateString("en-GB")
              );
              return (
                <div key={element._id} id="manage_event_card">
                  <div id="mve1">
                    <span id="mve2">
                      <Link to={`/user/eventForm/${element._id}`}>
                        <div
                          id="mve2_1"
                          style={{
                            backgroundImage: `url(/img/event/${element.picture})`,
                          }}
                        ></div>
                      </Link>
                      <div id="mve2_2">
                        <p id="mve_name">{element.name}</p>
                        <span>
                          <p>{date}</p>
                          <p>{element.location}</p>
                        </span>
                      </div>
                    </span>
                    <span id="mve3">
                      <a style={{ textDecoration: "none" }} href="#top">
                        <button
                          onClick={() => {
                            setToggle(true);
                            setEventId(element._id);
                          }}
                        >
                          Delete Event
                        </button>
                      </a>
                    </span>
                  </div>
                  <div id="border"></div>
                </div>
              );
            })}
        </div>
      ) : null}
      {toggle ? (
        <DeletePopUp
          id={eventId}
          toggl={() => setToggle(false)}
          func={removeEvent}
        />
      ) : null}
    </div>
  );
};
