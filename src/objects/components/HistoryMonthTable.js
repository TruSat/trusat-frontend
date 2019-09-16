import React, { useState, useEffect } from "react";
import axios from "axios";
import { renderFlag } from "../../app/helpers";
import { useObjectsState } from "../objects-context";
import { shortenAddress } from "../../app/helpers";
import Spinner from "../../app/components/Spinner";

export default function HistoryMonthTable({
  yearNumber,
  monthName,
  monthNumber
}) {
  const { noradNumber, objectOrigin } = useObjectsState();
  const [isLoading, setIsLoading] = useState(false);
  const [objectHistory, setObjectHistory] = useState([]);

  useEffect(() => {
    setIsLoading(true);

    const fetchData = async () => {
      await axios
        .post(
          `https://api.consensys.space:8080/object/history`,
          JSON.stringify({
            norad_number: noradNumber,
            year: yearNumber,
            month: monthNumber
          })
        )
        .then(result => {
          console.log(result.data);
          setObjectHistory(result.data);
          setIsLoading(false);
        })
        .catch(err => console.log(err));
    };

    fetchData();
  }, [noradNumber, yearNumber, monthNumber]);

  const renderDayRows = () => {
    return objectHistory.map(day => {
      return day.observation.map(observation => (
        <tr
          key={day.observation.indexOf(observation)}
          className="table__body-row"
        >
          <td className="table__table-data">{day.date}</td>
          <td className="table__table-data app__hide-on-mobile">
            {renderFlag(objectOrigin)}
          </td>
          <td className="table__table-data">
            {observation.user_location
              ? observation.user_location
              : "undisclosed"}
          </td>
          <td className="table__table-data app__hide-on-mobile">
            {observation.username
              ? observation.username
              : shortenAddress(observation.user_address)}
          </td>
          <td className="table__table-data">
            {observation.observation_quality}
          </td>
          <td className="table__table-data">
            {observation.observation_time_difference}
          </td>
          <td className="table__weight-data">
            {observation.observation_weight}%
          </td>
        </tr>
      ));
    });
  };

  return isLoading ? (
    <Spinner />
  ) : (
    <table className="table">
      <thead className="table__header">
        <tr className="table__header-row">
          <th className="table__month-text">{monthName}</th>
          <th className="app__hide-on-mobile"></th>
          <th className="table__header-text">LOCATION</th>
          <th className="table__header-text app__hide-on-mobile">USER</th>
          <th className="table__header-text">QUALITY</th>
          <th className="table__header-text">
            <p className="app__hide-on-mobile">TIME DIFF</p>
            <p className="app__hide-on-desktop">DIFF..</p>
          </th>
          <th className="table__header-weight-text">
            <p className="app__hide-on-mobile">WEIGHT</p>
            <p className="app__hide-on-desktop">WT.</p>
          </th>
        </tr>
      </thead>
      <tbody>{renderDayRows()}</tbody>
    </table>
  );
}

// const object_month_history = [
// for any given year and month, front end will receive an array of objects
// each object will contain a key of date - which represents the day date in the form of a number
// and a key of observations - which is an array of objects, one for each individual observation
//   {
//     date: 18,
//     observations: [
//       {
//         observation_time: "1550398277",
//         username: "Leo Barhorst",
//         user_address: "0x1863a72A0244D603Dcd00CeD99b94d517207716a",
//         user_location: "Brooklyn, USA",
//         observation_quality: "34",
//         observation_time_difference: "1.42", // this will be a positive or negative number in seconds
//         observation_weight: "33" // a percentage value- observations from a time further back will in theory have a much lower observation_weight
//       },
//       {
//         observation_time: "1550398277",
//         username: "Jim Smith",
//         user_address: "0x1863a72A0244D603Dcd00CeD99b94d517207716a",
//         user_location: "Los Angeles, USA",
//         observation_quality: "34",
//         observation_time_difference: "1.42",
//         observation_weight: "33"
//       }
//     ]
//   },
//   {
//     date: 15,
//     observations: [
//       {
//         observation_time: "1550398277",
//         username: "Joe Bloggs",
//         user_address: "0x1863a72A0244D603Dcd00CeD99b94d517207716a",
//         user_location: "Princeton, USA",
//         observation_quality: "10",
//         observation_time_difference: "1.42", // this will be a positive or negative number in seconds
//         observation_weight: "7" // a percentage value- observations from a time further back will in theory have a much lower observation_weight
//       },
//       {
//         observation_time: "1550398277",
//         username: "Bill Quinn",
//         user_address: "0x1863a72A0244D603Dcd00CeD99b94d517207716a",
//         user_location: "Belfast, UK",
//         observation_quality: "34",
//         observation_time_difference: "1.42",
//         observation_weight: "6"
//       }
//     ]
//   },
//   {
//     date: 5,
//     observations: [
//       {
//         observation_time: "1550398277",
//         username: "Leo Barhorst",
//         user_address: "0x1863a72A0244D603Dcd00CeD99b94d517207716a",
//         user_location: "Brooklyn, USA",
//         observation_quality: "34",
//         observation_time_difference: "1.42", // this will be a positive or negative number in seconds
//         observation_weight: "1" // a percentage value- observations from a time further back will in theory have a much lower observation_weight
//       },
//       {
//         observation_time: "1550398277",
//         username: "Jim Smith",
//         user_address: "0x1863a72A0244D603Dcd00CeD99b94d517207716a",
//         user_location: "Los Angeles, USA",
//         observation_quality: "34",
//         observation_time_difference: "1.42",
//         observation_weight: "1"
//       }
//     ]
//   }
// ];
