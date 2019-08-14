import React, { useState, useEffect } from "react";
import axios from "axios";
import { useAuthState } from "../auth/auth-context";

export default function Observations() {
  const { jwt } = useAuthState();

  // const [userData, setUserData] = useState([]);

  // useEffect(() => {
  //   axios
  //     .get(
  //       `http://ec2-18-222-251-120.us-east-2.compute.amazonaws.com:8080/mostRecent`
  //     )
  //     .then(result => {
  //       setUserData(result.data.community_observations);
  //     })
  //     .catch(err => console.log(err));
  // }, [setUserData]);

  const renderRows = () => {
    return userData.objects_observed.map(obj => (
      <tr key={userData.objects_observed.indexOf(obj)}>
        <td>{obj.object_name}</td>
        <td>
          {obj.object_type + " " + obj.object_origin + " " + obj.object_purpose}
        </td>
        <td>{obj.observation_count}</td>
      </tr>
    ));
  };

  const convertTimestamp = timestamp => {
    const dateObj = new Date(timestamp * 1000);
    return `${dateObj.getMonth() + 1}/${dateObj.getDate()}`;
  };

  const renderObservationHistory = () => {
    return Object.keys(userData.observation_history.this_month).map(
      timestamp => <p key={timestamp}>{convertTimestamp(timestamp)}</p>
    );
  };

  return (
    <div style={{ textAlign: "center" }}>
      <section style={{ margin: "1em" }}>
        <h1 style={{ fontWeight: "bold" }}>{userData.user_name}</h1>
        <img
          style={{ height: "auto", width: "120px" }}
          src={userData.user_image}
          alt="user avatar"
        />
        <p>{userData.location}</p>
        <p>Observations {userData.observation_count}</p>
        <p>Objects {userData.objects_tracked}</p>
      </section>

      <section style={{ margin: "1em" }}>
        <h1 style={{ fontWeight: "bold" }}>OBJECTS OBSERVED</h1>
        <table>
          <thead>
            <tr>
              <th>OBJECT</th>
              <th>TRAITS</th>
              <th>OBSERVATIONS</th>
            </tr>
          </thead>
          <tbody>{renderRows()}</tbody>
        </table>
      </section>

      <section style={{ margin: "1em" }}>
        <h1 style={{ fontWeight: "bold" }}>STATS</h1>
        {renderObservationHistory()}
        <p>{userData.user_record.objects_tracked} OBJECTS</p>
        <p>{userData.user_record.uncommon_birds_tracked} UNCOMMON BIRDS</p>
        <p>{userData.user_record.rare_birds_tracked} RARE BIRDS</p>
        <p>{userData.user_record.week_streak} WEEK STREAK</p>
      </section>
    </div>
  );
}

const userData = {
  user_name: "Scott_Tilley",
  user_image:
    "https://i.amz.mshcdn.com/KCJWkZNiwPyNXPcV0CN7yeL8G0A=/fit-in/1200x9600/https%3A%2F%2Fblueprint-api-production.s3.amazonaws.com%2Fuploads%2Fcard%2Fimage%2F784551%2F0e3defde-7d59-4d94-b094-51d187f930da.jpg",
  location: "Brixton, UK",
  observation_count: "59K",
  objects_tracked: 403,
  bio: "yada yada bio here...",
  objects_observed: [
    {
      object_name: "SL-27 R/B",
      object_type: "Comms",
      object_origin: "France",
      object_purpose: "military",
      time_spotted: "1550398277",
      observation_count: "50"
    },
    {
      object_name: "SL-27 R/B",
      object_type: "Comms",
      object_origin: "France",
      object_purpose: "military",
      time_spotted: "1550398277",
      observation_count: "50"
    },
    {
      object_name: "SL-27 R/B",
      object_type: "Comms",
      object_origin: "France",
      object_purpose: "military",
      time_spotted: "1550398277",
      observation_count: "50"
    }
  ],
  observation_history: {
    this_month: {
      "1550398277": 10,
      "1550398274": 12,
      "1550398272": 0,
      "1550398271": 2
    },
    all_time: {
      "1550398277": 10,
      "1550398274": 12,
      "1550398272": 0,
      "1550398271": 2
    }
  },
  user_record: {
    objects_tracked: "85",
    uncommon_birds_tracked: "18",
    rare_birds_tracked: "3",
    week_streak: "15"
  }
};
