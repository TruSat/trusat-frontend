import React, { useState, useEffect } from "react";
import axios from "axios";

export default function HistoryTable({ noradNumber, objectOrigin }) {
  const [objectHistory, setObjectHistory] = useState({});
  const [yearChosen, setYearChosen] = useState("2019");

  useEffect(() => {
    axios
      .post(
        `https://api.consensys.space:8080/object/history`,
        JSON.stringify({ norad_number: noradNumber, year: yearChosen })
      )
      .then(result => {
        console.log(result);
        setObjectHistory(result.data);
      })
      .catch(err => console.log(err));
  }, [noradNumber, yearChosen]);

  return <div>This is the history table</div>;
}

// POST request
// /objectHistory
// receives Norad Number and Year and returns a object with a key of the given year
// each year will key into an object that has keys for each month in descending order
// each month will key into an object that has keys for each day (number) in descending order
// each day date will key into an array of objects for all observations of this given object
const object_history = {
  2019: {
    december: {
      5: [
        {
          observation_time: "1550398277",
          username: "Leo Barhorst",
          user_address: "0x1863a72A0244D603Dcd00CeD99b94d517207716a",
          user_location: "Brooklyn, USA",
          observation_quality: "34",
          observation_time_difference: "1.42", // this will be a positive or negative number in seconds
          observation_weight: "33" // a percentage value- observations from a time further back will in theory have a much lower observation_weight
        },
        {
          observation_time: "1550398277",
          username: "Jim Smith",
          user_address: "0x1863a72A0244D603Dcd00CeD99b94d517207716a",
          user_location: "Los Angeles, USA",
          observation_quality: "34",
          observation_time_difference: "1.42",
          observation_weight: "33"
        }
      ]
    },
    november: [{}],
    october: [{}],
    september: [{}],
    august: [{}],
    july: [{}],
    june: [{}],
    may: [{}],
    april: [{}],
    march: [{}],
    february: [{}],
    january: [{}]
  }
};
