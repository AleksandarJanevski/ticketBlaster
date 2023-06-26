import React from 'react';
import PropTypes from 'prop-types';
import { formatDate } from '../functions/functions'
export const Dropdown = ({ elements, onChange, ime, ids }) => {
    return (
        <div>
            <select name={ime} id={ids} onChange={onChange}>
                {elements.map((elem, i) => {
                    let date = formatDate(new Date(elem.date).toLocaleDateString('en-GB'))
                    return (
                        <option key={i} value={elem._id}> {elem.name}-{date}-{elem.location} </option>
                    )
                })

                }
            </select>
        </div>
    )
}

Dropdown.propTypes = {
    elements: PropTypes.arrayOf(PropTypes.object).isRequired
}