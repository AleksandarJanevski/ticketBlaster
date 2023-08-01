import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { PrintEvent } from "./PrintEvent";
import { TicketCard } from "./TicketCard";

export const TicketHistory = () => {
  const tickets = useSelector((state) => state.userReducer.tickets);
  const [toggle, setToggle] = useState(false);
  const [print, setPrint] = useState({
    name: "",
    date: "",
    location: "",
    image: "",
    purchaseId: "",
  });
  useEffect(() => {
    document.addEventListener(
      "keydown",
      function (e) {
        if (e.key === "Escape") {
          setToggle(false);
        }
      },
      true
    );
  }, []);
  return (
    <div
      onClick={() =>
        document.addEventListener("mousedown", function () {
          setToggle(false);
        })
      }
      id="ticket_history"
    >
      <div id="ticket_list">
        <div>
          <TicketCard
            array={tickets.filter((element, i) => i % 2 === 0)}
            setPrint={setPrint}
            setToggle={setToggle}
          />
        </div>
        <div>
          <TicketCard
            array={tickets.filter((element, i) => i % 2 !== 0)}
            setPrint={setPrint}
            setToggle={setToggle}
          />
        </div>
      </div>
      {toggle ? (
        <PrintEvent
          name={print.name}
          image={print.image}
          location={print.location}
          date={print.date}
          value={`192.168.0.13:9000/api/v1/ecommerce/ticket/${print.purchaseId}`}
        />
      ) : null}
    </div>
  );
};
