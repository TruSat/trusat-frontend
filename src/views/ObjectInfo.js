import React, { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import axios from "axios";
import { useAuthState } from "../auth/auth-context";
import { request } from "http";

export default function ObjectInfo(props) {
  const { address, jwt } = useAuthState();
  const noradNumber = props.match.params.number;
  const [year, setYear] = useState("2019");

  const [objectInfo, setObjectInfo] = useState({});
  const [objectInfluence, setObjectInfluence] = useState([]);
  const [objectHistory, setObjectHistory] = useState({});
  const [userSightings, setUserSightings] = useState([]);
  const [mostSigtings, setMostSightings] = useState({});

  // observation filter options
  const [observationFilter, setObservationFilter] = useState("influence");

  useEffect(() => {});

  const getObjectInfo = () => {
    axios
      .post(
        `https://api.consensys.space:8080/object/info`,
        JSON.stringify({ norad_number: noradNumber })
      )
      .then(result => {
        console.log(result);
        setObjectInfo(result.data);
      })
      .catch(err => console.log(err));
  };

  const getObjectInfluence = () => {
    axios
      .post(
        `https://api.consensys.space:8080/object/influence`,
        JSON.stringify({ norad_number: noradNumber })
      )
      .then(result => {
        console.log(result);
        setObjectInfluence(result.data);
      })
      .catch(err => console.log(err));
  };

  const getObjectHistory = () => {
    axios
      .post(
        `https://api.consensys.space:8080/object/history`,
        JSON.stringify({ norad_number: noradNumber, year: year })
      )
      .then(result => {
        console.log(result);
        setObjectInfluence(result.data);
      })
      .catch(err => console.log(err));
  };

  const getUserSightings = () => {
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
        setObjectInfluence(result.data);
      })
      .catch(err => console.log(err));
  };

  // TODO - complete this request
  const getMostSightings = () => {};

  const renderInfluenceTable = () => {
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
          {object_influence.map(obj => {
            return (
              <tr key={object_influence.indexOf(obj)}>
                <td>{obj.observation_time}</td>
                <td>{object_info.object_origin}</td>
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
  };

  const renderHistoryTable = () => {
    return <div>This is the history table</div>;
  };

  const renderUserSightingsTable = () => {
    return <div>This is the user sightings table</div>;
  };

  return (
    <React.Fragment>
      <section style={{ margin: "1em" }}>
        <h1>{object_info.object_name}</h1>
        <div>
          <p>{object_info.object_origin}</p>
          <p>{object_info.object_primary_purpose}</p>
          <p>{object_info.object_secondary_purpose}</p>
          <p>{object_info.year_launched}</p>
        </div>
        <div>
          <p>NORAD# = {noradNumber}</p>
          <p>
            TRACKED BY {object_info.number_users_tracked} via{" "}
            {object_info.oservation_count} OBSERVATIONS
          </p>
          <p>
            LAST SEEN {object_info.time_last_tracked} BY{" "}
            {object_info.username_last_tracked}
          </p>
          <p>QUALITY {object_info.observation_quality}</p>
          <p />
        </div>
      </section>

      <section style={{ margin: "1em" }}>
        <h1>BACKGROUND</h1>
        <p>{object_info.object_background}</p>
        HOW TO SEE THIS SAT
        <NavLink to="/how">Follow this tutorial</NavLink>
        <a href={`${object_info.heavens_above_url}`}>
          Deep link to Heavens Above
        </a>
      </section>

      <section
        style={{
          margin: "1em"
        }}
      >
        <h1>OBSERVATIONS</h1>
        <div style={{ marginBottom: "1em" }}>
          <span
            style={{
              marginRight: "1em"
            }}
            onClick={() => setObservationFilter("influence")}
          >
            Influence
          </span>
          <span
            style={{
              marginRight: "1em"
            }}
            onClick={() => setObservationFilter("history")}
          >
            History
          </span>
          <span
            style={{
              marginRight: "1em"
            }}
            onClick={() => setObservationFilter("userSightings")}
          >
            My sightings
          </span>
          <a href="null">Get Data</a>
        </div>
        {observationFilter === "influence" ? renderInfluenceTable() : null}
        {observationFilter === "history" ? renderHistoryTable() : null}
        {observationFilter === "userSightings"
          ? renderUserSightingsTable()
          : null}
      </section>
    </React.Fragment>
  );
}

// POST REQUEST
// /objectInfo
// receives Norad Number and returns an object.
const object_info = {
  object_name: "Name of Sat",
  object_origin: "russia",
  object_type: "satelitte",
  object_primary_purpose: "military",
  object_secondary_purpose: "communications",
  year_launched: "1987",
  number_users_tracked: "77", // number of users that have successfully tracked this object
  oservation_count: "12000", // total number of observations that were submitted to create a TLE for this object from the beginning of collection records
  time_last_tracked: "1550398277", // timestamp
  address_last_tracked: "0x1863a72A0244D603Dcd00CeD99b94d517207716a",
  username_last_tracked: "Leo Barhorst",
  observation_quality: 77, // This is our object confidence "rating", may utilize user rank and individual observation_quality for example
  object_background:
    "Sed ut perspiciatis, unde omnis iste natus error sit voluptatem accusantium doloremque laudantium",
  heavens_above_url: "https://filler.com"
};

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

// POST request
// /objectMostSightings
// No design for this table present in Mikes figma file.
const most_sightings = {};
