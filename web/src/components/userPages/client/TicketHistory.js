import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { PrintEvent } from "../utils/PrintEvent";
import { TicketCard } from "../utils/TicketCard";
import { useNavigate } from "react-router-dom";
import { printAction } from "../../../redux/actions/printAction";

export const TicketHistory = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
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
    <div id="ticket_history">
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
        <div id="print_toggle">
          <PrintEvent
            name={print.name}
            image={print.image}
            location={print.location}
            date={print.date}
            value={`192.168.0.28:9000/api/v1/ecommerce/ticket/${print.purchaseId}`}
          />
          <button
            id="printCard"
            type="button"
            onClick={() => {
              dispatch(
                printAction({
                  name: print.name,
                  image: print.image,
                  location: print.location,
                  date: print.date,
                  value: `192.168.0.28:9000/api/v1/ecommerce/ticket/${print.purchaseId}`,
                })
              );
              navigate("/printPage");
            }}
          >
            <i class="fa-solid fa-print fa-lg" style={{ color: "#FF48AB" }}></i>
          </button>
        </div>
      ) : null}
    </div>
  );
};
