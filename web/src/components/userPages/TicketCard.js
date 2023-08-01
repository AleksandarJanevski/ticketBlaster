import React from "react";
import { formatDate } from "../utils/reusableFunctions";

export const TicketCard = ({ array, setPrint, setToggle }) => {
  return (
    array &&
    array.map((element, i) => {
      if (element.event) {
        let date = formatDate(
          new Date(element.event.date).toLocaleDateString("en-GB")
        );
        let now = new Date(element.event.date) < Date.now();
        return (
          <div
            key={i}
            id={"event_card"}
            style={now ? { opacity: "50%" } : null}
          >
            <div
              id="event_picture"
              style={{
                backgroundImage: `url(/img/event/${element.event.picture})`,
              }}
            ></div>
            <div id="event_info">
              <p id="ticket_name">{element.event.name}</p>
              <p id="ticket_date">{date}</p>
              <div id="details">
                <p>{element.event.details}</p>
              </div>
              <div id="bottom_card">
                <p>{element.event.location}</p>
                {!now ? (
                  <button
                    type="button"
                    onClick={() => {
                      const obj = {
                        name: element.event.name,
                        location: element.event.location,
                        date: date,
                        image: `/img/event/${element.event.picture}`,
                        purchaseId: element.purchaseNo,
                      };
                      setPrint(obj);
                      setToggle(true);
                    }}
                  >
                    Print
                  </button>
                ) : (
                  <button type="button" style={{ cursor: "default" }}>
                    Print
                  </button>
                )}
              </div>
            </div>
          </div>
        );
      }
    })
  );
};
