import React from "react";
import PropTypes from "prop-types";
import printLogo from "./print.png";
import QRCode from "react-qr-code";

export const PrintEvent = ({ name, image, date, location, style, value }) => {
  return (
    <div style={style} id="print">
      <img id="print_logo" src={printLogo} alt="" />
      <img id="print_image" src={image} alt="" />
      <div id="bottom_print">
        <div id="bottom_left">
          <p>{name}</p>
          <p>{date}</p>
          <p>{location}</p>
        </div>
        <QRCode
          value={value}
          id="qr"
          style={{ height: "152px", width: "152px" }}
        />
      </div>
    </div>
  );
};
PrintEvent.propTypes = {
  name: PropTypes.string.isRequired,
  image: PropTypes.string.isRequired,
  date: PropTypes.string.isRequired,
  location: PropTypes.string.isRequired,
};
