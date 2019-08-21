import React, { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import axios from "axios";
import { useAuthState } from "../auth/auth-context";

export default function Profile() {
  const { address, jwt } = useAuthState();
  console.log(`address = `, address);
  console.log(`jwt = `, jwt);

  const [userData, setUserData] = useState([]);

  useEffect(() => {
    if (address) {
      axios
        .post(
          `http://ec2-18-222-251-120.us-east-2.compute.amazonaws.com:8080/profile`,
          JSON.stringify({ jwt: jwt, eth_addr: address })
        )
        .then(result => {
          console.log(result);
          // setUserData(result.data.community_observations);
        })
        .catch(err => console.log(err));
    }
  }, [address, jwt, setUserData]);

  const renderRows = () => {
    return data.objects_observed.map(obj => (
      <tr key={data.objects_observed.indexOf(obj)}>
        <td>{obj.object_name}</td>
        <td>{obj.object_origin}</td>
        <td>{obj.object_primary_purpose}</td>
        <td>{obj.object_type}</td>
        <td>{obj.object_secondary_purpose}</td>
        <td>{obj.observation_quality}</td>
        <td>{obj.time_last_tracked}</td>
        <td>{obj.username_last_tracked}</td>
      </tr>
    ));
  };

  // const convertTimestamp = timestamp => {
  //   const dateObj = new Date(timestamp * 1000);
  //   return `${dateObj.getMonth() + 1}/${dateObj.getDate()}`;
  // };

  const renderObservationHistory = () => {
    return data.observation_history.map(observation => (
      <tr key={data.observation_history.indexOf(observation)}>
        <td>{observation.time_submitted}</td>
        <td>{observation.time_submitted}</td>
        <td>{observation.object_name}</td>
        <td>{observation.observation_quality}</td>
        <td>{observation.observation_time_difference}</td>
        <td>{observation.observation_weight}</td>
        <td>{observation.observation_iod}</td>
      </tr>
    ));
  };

  return (
    <div style={{ textAlign: "center" }}>
      <section style={{ margin: "1em" }}>
        <h1 style={{ fontWeight: "bold" }}>{data.user_name}</h1>
        <img
          style={{ height: "auto", width: "120px" }}
          src={data.user_image}
          alt="user avatar"
        />
        <p>Location = {data.user_location}</p>
        <p>Objects Tracked = {data.number_objects_tracked}</p>
        <p>Observation Count = {data.observation_count}</p>
        <p>Avg. Quality Level = {data.average_observation_quality}</p>
        <p>Bio = {data.user_bio}</p>
        <NavLink to="/profile/settings">Settings</NavLink>
      </section>

      <section style={{ margin: "1em" }}>
        <h1 style={{ fontWeight: "bold" }}>OBJECTS TRACKED</h1>
        <table>
          <thead>
            <tr>
              <th>NAME</th>
              <th>ORIGIN</th>
              <th>PURPOSE1</th>
              <th>TYPE</th>
              <th>PURPOSE2</th>
              <th>OBSERVATION QUALITY</th>
              <th>LAST TIME TRACKED</th>
              <th>LAST USER TO TRACK</th>
            </tr>
          </thead>
          <tbody>{renderRows()}</tbody>
        </table>
      </section>

      <section style={{ margin: "1em" }}>
        <h1 style={{ fontWeight: "bold" }}>YOUR OBSERVATIONS</h1>
        <table>
          <thead>
            <tr>
              <th>DATE</th>
              <th>TIME</th>
              <th>OBJECT NAME</th>
              <th>QUALITY</th>
              <th>TIME DIFF</th>
              <th>WEIGHT</th>
              <th>IOD</th>
            </tr>
          </thead>
          <tbody>{renderObservationHistory()}</tbody>
        </table>
      </section>
    </div>
  );
}

// POST request
// /profile
// receives JWT and returns object
// This query is unique to an individual user
const data = {
  username: "Scott_Tilley",
  user_image:
    "https://i.amz.mshcdn.com/KCJWkZNiwPyNXPcV0CN7yeL8G0A=/fit-in/1200x9600/https%3A%2F%2Fblueprint-api-production.s3.amazonaws.com%2Fuploads%2Fcard%2Fimage%2F784551%2F0e3defde-7d59-4d94-b094-51d187f930da.jpg",
  user_location: "Brixton, UK",
  user_email: "scott@space-cadet.com", // not used in render but will be passed to the "settings" component to save us another query
  observation_count: "59000",
  number_objects_tracked: "403",
  average_observation_quality: "65", // a percentage value
  user_bio: "yada yada bio here...",
  // objects they have tracked after we processes their observations (IODs submitted)
  // maybe confirmed_observations is a better name?
  // sorted by most recent
  objects_observed: [
    {
      object_norad_number: "12345", // used to for routing to the object page for this given object
      object_name: "SL-27 R/B",
      object_origin: "france",
      object_type: "satelitte",
      object_primary_purpose: "military",
      object_secondary_purpose: "communications",
      observation_quality: "50", // the quality of this individual observation
      time_last_tracked: "1550398277",
      address_last_tracked: "0x1863a72A0244D603Dcd00CeD99b94d517207716a",
      username_last_tracked: "username"
    },
    {
      object_norad_number: "12345",
      object_name: "SL-27 R/B",
      object_origin: "france",
      object_type: "satelitte",
      object_primary_purpose: "military",
      object_secondary_purpose: "communications",
      observation_quality: "50",
      time_last_tracked: "1550398277",
      address_last_tracked: "0x1863a72A0244D603Dcd00CeD99b94d517207716a",
      username_last_tracked: "username"
    },
    {
      object_norad_number: "12345",
      object_name: "SL-27 R/B",
      object_origin: "france",
      object_type: "satelitte",
      object_primary_purpose: "military",
      object_secondary_purpose: "communications",
      observation_quality: "50",
      time_last_tracked: "1550398277",
      address_last_tracked: "0x1863a72A0244D603Dcd00CeD99b94d517207716a",
      username_last_tracked: "username"
    }
  ],
  // essentially a full history of their IOD submissions
  // sorted by most recent
  // limit to 500 observations
  observation_history: [
    {
      time_submitted: "1550398277", // timestamp will be used to populate the date AND time fields in UI
      object_name: "SL-27 R/B",
      object_norad_number: "12345", // again, not used for rendering, placing here to aid with routing to object info page
      observation_quality: "34",
      observation_time_difference: "1.42", // seconds - will be a plus or minus value
      observation_weight: "30", // a percentage value
      observation_iod: "12345 98 123A..."
    },
    {
      time_submitted: "1550398277",
      object_name: "SL-27 R/B",
      object_norad_number: "12345",
      observation_quality: "34",
      observation_time_difference: "1.42",
      observation_weight: "30",
      observation_iod: "12345 98 123A..."
    },
    {
      time_submitted: "1550398277",
      object_name: "SL-27 R/B",
      object_norad_number: "12345",
      observation_quality: "34",
      observation_time_difference: "1.42",
      observation_weight: "30",
      observation_iod: "12345 98 123A..."
    }
  ]
};
