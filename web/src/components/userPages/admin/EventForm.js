import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Dropdown } from "../utils/Dropdown";
import { EventCard } from "../../utils/EventCard";
import { useSelector } from "react-redux";
import {
  preview,
  verifyData,
  uploadFunc,
  fetchEvents,
} from "../../utils/reusableFunctions";

export const EventForm = () => {
  const role = useSelector((state) => state.userReducer.user.role);
  const { eventId } = useParams();
  const navigate = useNavigate();
  const [concerts, setConcerts] = useState([]);
  const [standUp, setStandUp] = useState([]);
  const [matching, setMatching] = useState([]);
  const [image, setImage] = useState("");
  const [sent, setSent] = useState(false);
  let [t, setT] = useState(0);
  const [previewPic, setPreviewPic] = useState("");
  const [related, setRelated] = useState("");
  const currentDate = new Date().toISOString().split("T")[0];
  const year = currentDate.slice(0, 4);
  const maxDate = currentDate.replace(year, parseInt(year) + 5);
  const [event, setEvent] = useState({
    name: "",
    category: "",
    details: "",
    location: "",
    date: "",
    price: 0,
    tickets: 0,
    picture: "",
    relatedEvents: [],
  });
  useEffect(() => {
    if (role && role !== "admin") {
      navigate("/");
    }
  }, [role]);

  useEffect(() => {
    if (eventId) {
      getEvent();
    }
  }, []);

  useEffect(() => {
    if (t < 2) {
      fetchConcerts();
      fetchStandUp();
      setT((t += 1));
    }
  }, [event]);

  useEffect(() => {
    if (!eventId && sent) {
      createEvent();
    } else if (sent) {
      updateEvent();
    }
  }, [sent]);

  const fetchConcerts = async () => {
    await fetchEvents("concerts", (data) => {
      if (eventId) {
        const filteredConcerts = data.filter(
          (element) =>
            element._id !== eventId &&
            !event.relatedEvents.some(
              (relatedEvent) => relatedEvent._id === element._id
            )
        );
        setConcerts(filteredConcerts);
      } else {
        setConcerts(data);
      }
    });
  };

  const fetchStandUp = async () => {
    await fetchEvents("standUp", (data) => {
      if (eventId) {
        const filteredStandUp = data.filter((element) => {
          return (
            element._id !== eventId &&
            !event.relatedEvents.some((item) => item._id === element._id)
          );
        });
        setStandUp(filteredStandUp);
      } else {
        setStandUp(data);
      }
    });
  };

  const getEvent = async () => {
    try {
      const response = await fetch(`/api/v1/events/${eventId}`, {
        method: "GET",
        headers: {
          "Content-type": "aplication/json",
        },
        credentials: "include",
      });
      const result = await response.json();
      if (result.status === "success") {
        setEvent(result.data.event);
        setMatching(result.data.event.relatedEvents);
      }
    } catch (err) {
      return console.log(err);
    }
  };

  const picturePreview = (e) => {
    preview(e, setPreviewPic, setImage);
  };

  const addRelated = (e) => {
    e.preventDefault();
    if (related === "") {
      return alert(
        "Please make sure you have selected a category or an event!"
      );
    }
    const array = [...event.relatedEvents];
    let arr = [...matching];
    if (arr.length === 2) {
      return alert("Cannot add more related events!");
    }
    if (!array.includes(related) && related !== "") {
      array.push(related);
    }
    concerts.forEach((element) => {
      if (
        array.includes(element._id) &&
        !arr.includes(element) &&
        element !== ""
      ) {
        arr.push(element);
      }
    });
    standUp.forEach((element) => {
      if (
        array.includes(element._id) &&
        !arr.includes(element) &&
        element !== ""
      ) {
        arr.push(element);
      }
    });
    let filterConcerts = concerts.filter(
      (element) => !arr.some((item) => item === element)
    );
    let filterStandUp = standUp.filter(
      (element) => !arr.some((item) => item === element)
    );
    setStandUp(filterStandUp);
    setConcerts(filterConcerts);
    setMatching(arr);
    setEvent({ ...event, relatedEvents: array });
    const dropdownElement = document.getElementById("dropdown-select");
    dropdownElement.selectedIndex = 0;
    setRelated("");
  };

  const removeRelated = (elem) => {
    let array = [...event.relatedEvents];
    let arr = [...matching];
    array = array.filter((element) => {
      if (typeof element === "object" && elem._id !== element._id) {
        return element;
      } else if (typeof element === "string" && elem._id !== element) {
        return element;
      }
    });
    arr = arr.filter((element) => element !== elem);
    let concertArr = [...concerts];
    let standUpArr = [...standUp];
    let bool = false;
    if (elem.category === "Musical Concert") {
      if (!concertArr.some((element) => element._id === elem._id)) {
        concertArr.push(elem);
        bool = true;
      }
    } else {
      if (!standUpArr.some((element) => element._id === elem._id)) {
        standUpArr.push(elem);
      }
    }
    if (bool) {
      setConcerts(concertArr);
    } else {
      setStandUp(standUpArr);
    }
    setMatching(arr);
    setEvent({ ...event, relatedEvents: array });
  };

  const handleUpload = async () => {
    try {
      let valid = verifyData(event, false);
      if (valid) {
        await uploadFunc(
          previewPic,
          event.picture,
          setEvent,
          event,
          setSent,
          true,
          "event"
        );
      }
    } catch (err) {
      setSent(false);
      return alert(err.message);
    }
  };

  const createEvent = async () => {
    try {
      let valid = verifyData(event, true);
      if (valid) {
        const response = await fetch("/api/v1/events", {
          method: "POST",
          body: JSON.stringify(event),
          headers: {
            "content-type": "application/json",
          },
          credentials: "include",
        });
        const result = await response.json();
        if (result.status === "success") {
          window.location.href = `/user/eventForm`;
        }
      } else {
        setSent(false);
      }
    } catch (err) {
      alert("Invalid Data Input");
      setSent(false);
      return console.log(err);
    }
  };

  const updateEvent = async () => {
    try {
      let valid = verifyData(event, true);
      const invalid = [";", "<", ">", "{", "}"];
      for (let key in event) {
        let value = event[key];
        if (typeof value === "string") {
          for (let char of value) {
            if (invalid.includes(char)) {
              setSent(false);
              return alert("Please check the " + key + " input field");
            }
          }
        }
      }
      if (valid) {
        const response = await fetch(`/api/v1/events/${eventId}`, {
          method: "PATCH",
          body: JSON.stringify(event),
          headers: {
            "content-type": "application/json",
          },
          credentials: "include",
        });
        const result = await response.json();
        if (result.status === "success") {
          window.location.href = `/event/${eventId}`;
        } else {
          setSent(false);
        }
      }
    } catch (err) {
      return console.log(err);
    }
  };

  return (
    <div id="eventForm">
      {role === "admin" ? (
        <>
          <div id="eForm_one">
            <span>
              <label htmlFor="">Event Name</label>
              <input
                type="text"
                name="name"
                value={event.name}
                onChange={(e) => {
                  setEvent({ ...event, name: e.target.value });
                }}
                className="formInput"
                required
              />
            </span>
            <span>
              <label htmlFor="">Category</label>
              <select
                name="category"
                id="category"
                required
                value={event.category}
                onChange={(e) => {
                  setEvent({ ...event, category: e.target.value });
                }}
              >
                <option value=""></option>
                <option value="Musical Concert">Musical Concert</option>
                <option value="Stand-up Comedy">Stand-up Comedy</option>
              </select>
            </span>
            <span>
              <label htmlFor="">Date</label>
              <input
                type="date"
                name="date"
                min={currentDate}
                max={maxDate}
                className="formInput"
                required
                value={
                  event.date
                    ? new Date(event.date).toISOString().split("T")[0]
                    : ""
                }
                onChange={(e) => {
                  setEvent({ ...event, date: e.target.value });
                }}
              />
            </span>
          </div>
          <div id="eForm_two">
            <span id="eventArt">
              <div id="divFile">
                <input
                  type="file"
                  id="evenFileInput"
                  onChange={picturePreview}
                  accept="image/png, image/jpg, image/jpeg"
                />
                Upload Event Art
              </div>

              {image ? (
                <div
                  id="preview_event"
                  style={{ backgroundImage: `url(${image})` }}
                />
              ) : !eventId ? (
                <div id="event_photo">Event Photo</div>
              ) : (
                <div
                  id="preview_event"
                  style={{
                    backgroundImage: `url(/img/event/${event.picture})`,
                  }}
                />
              )}
            </span>
            <div id="eventDetails">
              <div id="event_textarea">
                <label htmlFor="">Event Details</label>
                <textarea
                  id="inputDetails"
                  value={event.details}
                  onChange={(e) => {
                    setEvent({ ...event, details: e.target.value });
                  }}
                  required
                ></textarea>
              </div>
              <div id="price_amount_details">
                <span>
                  <label htmlFor="">Ticket Price</label>
                  <input
                    type="number"
                    required
                    value={event.price}
                    onChange={(e) => {
                      setEvent({ ...event, price: Number(e.target.value) });
                    }}
                    min={1}
                  />
                </span>
                <span>
                  <label htmlFor="">Ticket Amount</label>
                  <input
                    type="number"
                    required
                    value={event.tickets}
                    onChange={(e) => {
                      setEvent({ ...event, tickets: Number(e.target.value) });
                    }}
                    name="amount"
                    min={0}
                    max={5000}
                  />
                </span>
                <span>
                  <label htmlFor="">Location</label>
                  <input
                    type="text"
                    required
                    value={event.location}
                    onChange={(e) => {
                      setEvent({ ...event, location: e.target.value });
                    }}
                  />
                </span>
              </div>
            </div>
          </div>
          <div id="eForm_three">
            <div id="eForm__three_flex">
              <div id="relatedInput">
                <label htmlFor="">Related Events</label>
                <span>
                  {["Musical Concert", "Stand-up Comedy"].includes(
                    event.category
                  ) ? (
                    <Dropdown
                      elements={
                        event.category === "Musical Concert"
                          ? concerts
                          : standUp
                      }
                      onChange={(e) => {
                        setRelated(e.target.value);
                      }}
                    />
                  ) : (
                    <select id="dropdown-select"></select>
                  )}
                </span>
              </div>

              {event.category ? (
                <button id="addRelated" onClick={addRelated}>
                  Add
                </button>
              ) : (
                <button
                  id="addRelated"
                  onClick={(e) => {
                    e.preventDefault();
                    return alert("Please select event category first");
                  }}
                >
                  Add
                </button>
              )}
            </div>

            <div
              style={
                event.relatedEvents.length > 0
                  ? { marginBottom: "102px" }
                  : null
              }
              id="relatedEvents"
            >
              {event.relatedEvents ? (
                <div id="relatedList">
                  <EventCard
                    id={"eventRelated"}
                    option={3}
                    array={matching.slice(0, 1)}
                    func={removeRelated}
                  />
                  <EventCard
                    id={"eventRelated"}
                    option={3}
                    array={matching.slice(1)}
                    func={removeRelated}
                  />
                </div>
              ) : null}
            </div>
          </div>
          <button id="eventButton" type="button" onClick={handleUpload}>
            Save
          </button>
        </>
      ) : null}
    </div>
  );
};
