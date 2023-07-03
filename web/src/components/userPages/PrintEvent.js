import React from "react";
import PropTypes from 'prop-types'

export const PrintEvent = ({ name, image, date, location, style }) => {
    return (
        <div style={style} id="print">
            <p>ticketblaster</p>
            <img src={image} alt="" />
            <div id="bottom_print">
                <div id="bottom_left">
                    <p>{name}</p>
                    <p>{date}</p>
                    <p>{location}</p>
                </div>
                <img src="https://www.freepnglogos.com/uploads/qr-code-png/qr-code-file-bangla-mobile-code-0.png" alt="" />
            </div>
        </div>
    )
}
PrintEvent.propTypes = {
    name: PropTypes.string.isRequired,
    image: PropTypes.string.isRequired,
    date: PropTypes.string.isRequired,
    location: PropTypes.string.isRequired,
}