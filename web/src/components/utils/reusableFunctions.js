export const formatDate = (date, bool) => {
  try {
    const months = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ];
    let day = date.split("/")[0];
    let month = date.split("/")[1];
    let year = date.split("/")[2];

    if (day.startsWith("0")) {
      day = day.slice(1);
    }

    if (day === "11" || day === "12" || day === "13") {
      day = day + "th";
    } else if (day.endsWith("1")) {
      day = day + "st";
    } else if (day.endsWith("2")) {
      day = day + "nd";
    } else if (day.endsWith("3")) {
      day = day + "rd";
    } else {
      day = day + "th";
    }
    month = months[month - 1];
    if (!bool) {
      return `${month} ${day}, ${year}`;
    } else {
      return `${month} ${day} ${year}`;
    }
  } catch (err) {
    return console.log(err);
  }
};
export const preview = (e, setUpload, setPreview) => {
  const file = e.target.files[0];
  if (file.size > 1024 * 1024) {
    return alert("File exceeds limit of 1MB");
  }
  setUpload(file);
  if (file) {
    const reader = new FileReader();

    reader.onloadend = () => {
      setPreview(reader.result);
    };

    reader.readAsDataURL(file);
  } else {
    setPreview("");
  }
};

export function verifyData(obj, bool) {
  for (let key in obj) {
    console.log(key, obj);
    if (
      (bool && typeof obj[key] === "string" && obj[key].trim() === "") ||
      (typeof obj[key] === "number" && obj[key] <= 0)
    ) {
      alert(`Please check the ${key} input field!`);
      return false;
    } else if (
      (typeof obj[key] === "string" &&
        obj[key].trim() === "" &&
        key !== "picture") ||
      (typeof obj[key] === "number" && obj[key] <= 0)
    ) {
      alert(`Please check the ${key} input field`);
      return false;
    }
  }
}

export const uploadFunc = async (
  update,
  current,
  setObj,
  object,
  setTrigger,
  trigger,
  location
) => {
  try {
    if (update && update !== current) {
      const formData = new FormData();
      formData.append("picture", update);

      const response = await fetch(`/api/v1/upload/${location}`, {
        method: "POST",
        body: formData,
        headers: {
          credentials: "include",
        },
      });

      const data = await response.json();
      const pictureName = data.filename;
      setObj({ ...object, picture: pictureName });
    }
    setTrigger(trigger);
  } catch (err) {
    return console.log(err);
  }
};

export const fetchEvents = async (event, option) => {
  try {
    const response = await fetch(`/api/v1/events/${event}`, {
      method: "GET",
      headers: {
        "Content-type": "aplication/json",
      },
    });
    const result = await response.json();
    if (result.status === "success") {
      const empty = {};
      let arr = result.data.events;
      arr.unshift(empty);
      option(arr);
    }
  } catch (err) {
    return console.log(err);
  }
};

export const redux = async (url, func, action, option, action2, action3) => {
  try {
    const response = await fetch(url, {
      method: "GET",
      headers: {
        "Content-type": "aplication/json",
      },
      credentials: "include",
    });
    const result = await response.json();
    if (result.status === "success") {
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
          let array = result.data.events;
          array.sort((a, b) => {
            return a.date - b.date;
          });
          const hero = array.slice(0, 1);
          const comedy = array.filter(
            (element) => element.category === "Stand-up Comedy"
          );
          const concerts = array.filter(
            (element) => element.category === "Musical Concert"
          );
          func(action(hero[0]));
          func(action2(comedy));
          func(action3(concerts));
          break;
        default:
          break;
      }
    }
  } catch (err) {
    return console.log(err);
  }
};
