import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { EventCard } from "../utils/EventCard";
import { useSelector } from "react-redux";

export const CategoryEvents = () => {
  const { type } = useParams();
  const concerts = useSelector((state) => state.eventsReducer.concerts);
  const standUp = useSelector((state) => state.eventsReducer.standUp);
  const [load, setLoad] = useState(5);
  const [num, setNum] = useState(0);
  useEffect(() => {
    if (type === "musicalConcerts") {
      setNum(concerts.length);
    } else {
      setNum(standUp.length);
    }
    setLoad(5);
  }, [type]);
  return (
    <div id="category_events">
      <h1>
        {type === "musicalConcerts" ? "Musical Concerts" : "Stand-up Comedy"}
      </h1>
      <div id="category_list">
        <EventCard
          id={"event_card"}
          array={
            type === "musicalConcerts"
              ? concerts.filter((e, i) => i % 2 === 0)
              : standUp.filter((e, i) => i % 2 === 0)
          }
          option={1}
          load={load}
        />
        <EventCard
          id={"event_card"}
          array={
            type === "musicalConcerts"
              ? concerts.filter((e, i) => i % 2 !== 0)
              : standUp.filter((e, i) => i % 2 !== 0)
          }
          option={1}
          load={load}
        />
      </div>
      {load * 2 < num ? (
        <button
          id="categoryLoad"
          onClick={() => {
            setLoad(load + 5);
          }}
        >
          Load More
          {type === "musicalConcerts"
            ? " Musical Concerts"
            : " Stand-up Comedy Shows"}
        </button>
      ) : null}
    </div>
  );
};
