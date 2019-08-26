import React, { useState, useEffect } from "react";
import axios from "axios";
import { useAuthState } from "../../auth/auth-context";

export default function UserSightingsTable({ noradNumber, objectOrigin }) {
  const { jwt, address } = useAuthState();
  const [objectUserSightings, setObjectUserSightings] = useState([]);

  useEffect(() => {
    axios
      .post(
        `https://api.consensys.space:8080/object/userSightings`,
        JSON.stringify({
          norad_number: noradNumber,
          jwt: jwt,
          address: address
        })
      )
      .then(result => {
        console.log(result);
        setObjectUserSightings(result.data);
      })
      .catch(err => console.log(err));
  }, [jwt, address, noradNumber]);

  return (
    <table>
      <thead>
        <tr>
          <th>DATE</th>
          <th />
          <th />
          <th>USER</th>
          <th>QUAlITY</th>
          <th>TIME DIFF</th>
          <th>WEIGHT</th>
        </tr>
      </thead>
      <tbody>
        {user_sightings.map(obj => {
          return (
            <tr key={user_sightings.indexOf(obj)}>
              <td>{obj.observation_time}</td>
              <td>{objectOrigin}</td>
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
  );
}

// POST request
// /objectUserSightings
// receives Norad Number and JWT and returns and array of objects
// sorted by most recent
const user_sightings = [
  {
    observation_time: "1550398277",
    username: "Leo Barhorst",
    user_address: "0x1863a72A0244D603Dcd00CeD99b94d517207716a",
    user_location: "Brooklyn, USA",
    observation_quality: "34",
    observation_time_difference: "1.42",
    observation_weight: "10" // The users most recent observations will in theory have a higher observation_weight %
  },
  {
    observation_time: "1550398277",
    username: "Leo Barhorst",
    user_address: "0x1863a72A0244D603Dcd00CeD99b94d517207716a",
    user_location: "Brooklyn, USA",
    observation_quality: "34",
    observation_time_difference: "1.42",
    observation_weight: "1"
  },
  {
    observation_time: "1550398277",
    username: "Leo Barhorst",
    user_address: "0x1863a72A0244D603Dcd00CeD99b94d517207716a",
    user_location: "Brooklyn, USA",
    observation_quality: "34",
    observation_time_difference: "1.42",
    observation_weight: "0"
  }
];
