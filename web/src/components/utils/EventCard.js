import React from "react";
import PropTypes from "prop-types";
import { formatDate } from "./reusableFunctions";
import { Link } from "react-router-dom";
export const EventCard = ({
  array,
  option,
  load,
  func,
  setOne,
  setTwo,
  id,
}) => {
  const buttonType = (option, element) => {
    switch (option) {
      case 1:
        if (element.tickets === 0) {
          return (
            <button
              type="button"
              id="getTickets"
              style={{ color: "white", cursor: "default" }}
            >
              Sold Out
            </button>
          );
        } else {
          return (
            <Link id="getTicketsAnchor" to={`/event/${element._id}`}>
              <button id="getTickets">Get Tickets</button>
            </Link>
          );
        }
      case 2:
        if (element.tickets === 0) {
          return (
            <button
              type="button"
              id="getTickets"
              style={{ color: "white", cursor: "default" }}
            >
              Sold Out
            </button>
          );
        } else {
          return (
            <Link id="getTicketsAnchor" to={`/event/${element._id}`}>
              <button id="getTickets">Get Tickets</button>
            </Link>
          );
        }
      case 3:
        return (
          <button id="removeRelated" onClick={() => func(element)}>
            Remove
          </button>
        );
      default:
        break;
    }
  };
  return (
    <div id="card">
      {array &&
        array.map((element, i) => {
          let date = formatDate(
            new Date(element.date).toLocaleDateString("en-GB")
          );
          if (i >= load) return;
          return (
            <div key={i} id={id}>
              <div
                id="event_picture"
                style={{
                  backgroundImage: `url(/img/event/${element.picture})`,
                }}
              ></div>
              <div id="event_info">
                <div id="event_name_location">
                  <p>{element.name}</p>
                  {option !== 2 ? <p>{date}</p> : null}
                  {option !== 3 ? null : <p>{element.location}</p>}
                </div>
                {option !== 3 ? (
                  <div id="details">
                    <p>{element.details}</p>
                  </div>
                ) : null}
                {option !== 2 ? (
                  <div id="bottom_card">
                    {option !== 3 ? <p>{element.location}</p> : null}
                    {buttonType(option, element, func)}
                  </div>
                ) : (
                  <div id="bottom_card">
                    <div>
                      <p id="search_date">{date}</p>
                      <p>{element.location}</p>
                    </div>
                    {buttonType(option, element, func)}
                  </div>
                )}
              </div>
            </div>
          );
        })}
    </div>
  );
};

EventCard.propTypes = {
  array: PropTypes.array.isRequired,
  option: PropTypes.number.isRequired,
  func: PropTypes.func,
};
