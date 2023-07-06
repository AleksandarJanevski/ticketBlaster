import axios from "axios";

export const formatDate = (date, bool) => {
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
        if (!bool) {
            return (`${month} ${day}, ${year}`)
        } else {
            return (`${month} ${day} ${year}`)
        }

    } catch (err) {
        console.log(err);
    }
}
export const preview = (e, setUpload, setPreview) => {
    const file = e.target.files[0];
    setUpload(file);
    if (file) {
        const reader = new FileReader();

        reader.onloadend = () => {
            setPreview(reader.result);
        };

        reader.readAsDataURL(file);
    } else {
        setPreview('');
    }
}
export function verifyData(obj, bool) {
    for (let key in obj) {
        if (bool && (typeof obj[key] === 'string' && obj[key].trim() === '') || (obj[key] === null && obj[key] <= 0)) {
            alert(`Please fill out the ${key} input field`)
            return false
        } else if ((typeof obj[key] === 'string' && obj[key].trim() === '' && key !== 'picture') || (obj[key] === null && obj[key] <= 0)) {
            alert(`Please fill out the ${key} input field`)
            return false

        }
    }
    return true
}
export const uploadFunc = async (update, current, setObj, object, setTrigger, trigger, location) => {
    try {
        if (update && update !== current) {
            const response = await axios.post(`/api/v1/upload/${location}`, { picture: update }, {
                headers: {
                    'content-type': 'multipart/form-data'
                },
                credentials: 'include'
            })
            const pictureName = response.data.filename
            setObj({ ...object, picture: pictureName });
        }
        setTrigger(!trigger)
    } catch (err) {
        return console.log(err);
    }
}
export const fetchEvents = async (dispatch, option, event) => {
    try {
        const response = await fetch(`/api/v1/events/${event}`, {
            method: 'GET',
            headers: {
                'Content-type': 'aplication/json'
            },
        });
        const result = await response.json();
        if (result.status === 'success') {
            if (dispatch) {
                dispatch(option(result.data.events))
            } else {
                const empty = {}
                let arr = result.data.events
                arr.unshift(empty)
                option(arr);
            }

        }
    } catch (err) {
        return console.log(err);
    }
}
export const redux = async (url, func, action, option) => {
    try {
        const response = await fetch(url, {
            method: 'GET',
            headers: {
                'Content-type': 'aplication/json'
            },
            credentials: 'include'
        });
        const result = await response.json();
        if (result.status === 'success') {
            switch (option) {
                case 1:
                    func(action(result.data.basket));
                    break;
                case 2:
                    func(action(result.data.user));
                    break;
                case 3:
                    let arr = result.data.orders;
                    arr.sort((a, b) => {
                        return new Date(b.eventDate) - new Date(a.eventDate);
                    });
                    func(action(arr));
                    break;
                case 4:
                    func(action(result.data.hero));
                    break;
                case 5:
                    func(action(result.data.id));
                    break;
                default:
                    break;
            }
        }
    } catch (err) {
        return console.log(err);
    }
}