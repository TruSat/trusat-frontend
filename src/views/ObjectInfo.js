import React, { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import axios from "axios";
import InfluenceTable from "../object/components/InfluenceTable";
import HistoryTable from "../object/components/HistoryTable";
import UserSightingsTable from "../object/components/UserSightingsTable";
import DownloadObjectTleButton from "../object/components/DownloadObjectTleButton";

export default function ObjectInfo({ match }) {
  const noradNumber = match.params.number;

  const [objectInfo, setObjectInfo] = useState({});

  // const [objectMostSigtings, setObjectMostSightings] = useState({});

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

  // TODO - complete this request
  // const getObjectMostSightings = () => {};

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
          <DownloadObjectTleButton noradNumber={noradNumber} />
        </div>
        {observationFilter === "influence" ? (
          <InfluenceTable
            noradNumber={noradNumber}
            objectOrigin={object_info.object_origin}
          />
        ) : null}
        {observationFilter === "history" ? (
          <HistoryTable
            noradNumber={noradNumber}
            objectOrigin={object_info.object_origin}
          />
        ) : null}
        {observationFilter === "userSightings" ? (
          <UserSightingsTable
            noradNumber={noradNumber}
            objectOrigin={object_info.object_origin}
          />
        ) : null}
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
// /objectMostSightings
// No design for this table present in Mikes figma file.
const most_sightings = {};
