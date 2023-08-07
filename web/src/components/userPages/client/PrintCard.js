import React, { useEffect } from "react";
import printLogo from "../print.png";
import QRCode from "react-qr-code";
import { useSelector } from "react-redux/es/hooks/useSelector";
import { useNavigate } from "react-router-dom";

export const PrintCard = () => {
  const card = useSelector((state) => state.printReducer.print);
  const navgate = useNavigate();
  useEffect(() => {
    console.log(card);
    document.getElementById("main_header").style.opacity = 0;
    document.getElementById("footer").style.opacity = 0;
    window.print();
    navgate("/user/ticketHistory");
    document.getElementById("main_header").style.opacity = 1;
    document.getElementById("footer").style.opacity = 1;
  }, []);
  return (
    <div
      style={{ top: "150px", transform: "scale(1.2)", marginBottom: "20px" }}
      id="print"
    >
      <img id="print_logo" src={printLogo} alt="" />
      <img
        id="print_image"
        src={card.image}
        alt=""
        style={{ width: "443px", height: "262px" }}
      />
      <div id="bottom_print">
        <div id="bottom_left">
          <p>{card.name}</p>
          <p>{card.date}</p>
          <p>{card.location}</p>
        </div>
        <QRCode
          value={card.value}
          id="qr"
          style={{ height: "152px", width: "152px" }}
        />
      </div>
    </div>
  );
};
