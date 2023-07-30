import React from "react";
import PropTypes from "prop-types";
import { formatDate } from "../utils/reusableFunctions";
export const Dropdown = ({ elements, onChange, ime }) => {
  return (
    <div className="custom_select">
      <select name={ime} id="dropdown-select" onChange={onChange}>
        {elements.map((elem, i) => {
          if (i === 0) {
            return <option id="option" key={i} value={undefined}></option>;
          } else {
            let date = formatDate(
              new Date(elem.date).toLocaleDateString("en-GB")
            );
            return (
              <option id="option" key={i} value={elem._id}>
                {elem.name} - {date} - {elem.location}
              </option>
            );
          }
        })}
      </select>
    </div>
  );
};

Dropdown.propTypes = {
  elements: PropTypes.arrayOf(PropTypes.object).isRequired,
};
