import React, { useState, useEffect } from "react";
import axios from "axios";

export default function InfluenceTable({ noradNumber, objectOrigin }) {
  const [showTable, setShowTable] = useState(false);
  const [objectInfluence, setObjectInfluence] = useState([]);

  useEffect(() => {
    axios
      .post(
        `https://api.consensys.space:8080/object/influence`,
        JSON.stringify({ norad_number: noradNumber })
      )
      .then(result => {
        console.log(result.data);
        setObjectInfluence(result.data);
        setShowTable(true);
      })
      .catch(err => console.log(err));
  }, [noradNumber]);

  return showTable ? (
    <table>
      <thead>
        <tr>
          <th>DATE</th>
          <th />
          <th />
          <th>USER</th>
          <th>QUALITY</th>
          <th>TIME DIFF</th>
          <th>WEIGHT</th>
        </tr>
      </thead>
      <tbody>
        {objectInfluence.map(obj => {
          return (
            <tr key={objectInfluence.indexOf(obj)}>
              <td>{obj.observation_time}</td>
              <td>{obj.object_origin}</td>
              <td>{obj.user_location}</td>
              <td>{obj.username}</td>
              <td>{obj.observation_quality}</td>
              <td>{obj.observation_time_difference}</td>
              <td>{obj.observation_weight}</td>
            </tr>
          );
        })}
      </tbody>
    </table>
  ) : null;
}

// POST request
// /objectInfluence
// receives Norad Number and returns and array of objects
// Lists the most influential users who have helped to create the LATEST TLE with an accurate sighting
// Weight should add up to 100%
// sorted by most influence
const object_influence = [
  {
    observation_time: "1550398277",
    username: "Leo Barhorst",
    user_address: "0x1863a72A0244D603Dcd00CeD99b94d517207716a", // always needed as a fallback in event the user has not not created a username
    user_location: "Brooklyn, USA", // only available if the user has made it publicly available
    observation_quality: "34", // quality/accuracy of the individual observastion
    observation_time_difference: "1.42", // this will be a positive or negative number in seconds
    observation_weight: "33" // a percentage value
  },
  {
    observation_time: "1550398277",
    username: "Jim Smith",
    user_address: "0x1863a72A0244D603Dcd00CeD99b94d517207716a",
    user_location: "Los Angeles, USA",
    observation_quality: "45",
    observation_time_difference: "1.42",
    observation_weight: "33"
  },
  {
    observation_time: "1550398277",
    username: "Joe Bloggs",
    user_address: "0x1863a72A0244D603Dcd00CeD99b94d517207716a",
    user_location: "London, UK",
    observation_quality: "20",
    observation_time_difference: "1.42",
    observation_weight: "33"
  }
];
