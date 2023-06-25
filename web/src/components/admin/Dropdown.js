import React from 'react';
import PropTypes from 'prop-types';

export const Dropdown = ({ elements, onChange, ime, ids }) => {
    const formatDate = (date) => {
        try {
            const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
            let day = date.split('/')[0]
            let lastDigit = parseInt(day.slice(1));
            let month = date.split('/')[1]
            let year = date.split('/')[2]
            if (day.startsWith('0')) {
                day = day.slice(1);
            }
            if (lastDigit === 1 && day !== 11) {
                day = day + "st"
            } else if (lastDigit === 2 && day !== 12) {
                day = day + "nd"
            } else if (lastDigit === 3 && day !== 13) {
                day = day + "rd"
            } else {
                day = day + "th"
            }
            month = months[month - 1]
            return (`${month} ${day}, ${year}`)
        } catch (err) {
            console.log(err);
        }
    }
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