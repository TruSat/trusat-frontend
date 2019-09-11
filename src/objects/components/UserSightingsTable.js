import React, { useState, useEffect } from "react";
import axios from "axios";
import { useAuthState } from "../../auth/auth-context";
import { useUserState } from "../../user/user-context";
import { useObjectsState } from "../objects-context";
import { renderFlag } from "../../app/helpers/";
import { shortenAddress } from "../../app/helpers";

export default function UserSightingsTable() {
  const { jwt } = useAuthState();
  const { userAddress } = useUserState();
  const { noradNumber, objectOrigin } = useObjectsState();
  const [objectUserSightings, setObjectUserSightings] = useState([]);
  const [showTable, setShowTable] = useState(false);

  useEffect(() => {
    axios
      .post(
        `https://api.consensys.space:8080/object/userSightings`,
        JSON.stringify({
          norad_number: noradNumber,
          jwt: jwt,
          address: userAddress
          // leos address for testing
          // address: "0x5C760Ba09C12E4fd33be49f1B05E6E1e648EB312"
        })
      )
      .then(result => {
        console.log(result);
        setObjectUserSightings(result.data);
        setShowTable(true);
      })
      .catch(err => console.log(err));
  }, [jwt, userAddress, noradNumber]);

  return showTable ? (
    <table className="table">
      <thead className="table__header">
        <tr className="table__header-row">
          <th className="table__header-text">DATE</th>
          <th />
          <th />
          <th className="table__header-text">USER</th>
          <th className="table__header-text">QUAlITY</th>
          <th className="table__header-text">TIME DIFF</th>
          <th className="table__header-weight-text">WEIGHT</th>
        </tr>
      </thead>
      <tbody>
        {objectUserSightings.map(obj => {
          return (
            <tr
              key={objectUserSightings.indexOf(obj)}
              className="table__body-row"
            >
              <td className="table__table-data">{obj.observation_time}</td>
              <td className="table__table-data">{renderFlag(objectOrigin)}</td>
              <td className="table__table-data">
                {obj.user_location ? obj.user_location : "undisclosed location"}
              </td>
              <td className="table__table-data">
                {obj.username ? obj.username : shortenAddress(obj.user_address)}
              </td>
              <td className="table__table-data">{obj.observation_quality}</td>
              <td className="table__table-data">
                {obj.observation_time_difference}
              </td>
              <td className="table__weight-data">{obj.observation_weight}</td>
            </tr>
          );
        })}
      </tbody>
    </table>
  ) : null;
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
