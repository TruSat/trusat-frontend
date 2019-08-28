import React, { useState } from "react";
import Info from "../object/components/Info";
import InfluenceTable from "../object/components/InfluenceTable";
import HistoryYearDropdown from "../object/components/HistoryYearDropdown";
import UserSightingsTable from "../object/components/UserSightingsTable";
import DownloadObjectTleButton from "../object/components/DownloadObjectTleButton";

export default function ObjectInfo({ match }) {
  const noradNumber = match.params.number;

  // const [objectMostSigtings, setObjectMostSightings] = useState({});

  // observation filter options
  const [observationFilter, setObservationFilter] = useState("influence");

  // TODO - complete this request
  // const getObjectMostSightings = () => {};

  return (
    <React.Fragment>
      <Info noradNumber={noradNumber} />

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
      </section>
      {observationFilter === "influence" ? (
        <InfluenceTable
          noradNumber={noradNumber}
          objectOrigin={object_info.object_origin}
        />
      ) : null}
      {observationFilter === "history" ? (
        <HistoryYearDropdown
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
    </React.Fragment>
  );
}

// POST REQUEST
// /objectInfo
// receives Norad Number and returns an object.
const object_info = {
  object_origin: "russia"
};

// POST request
// /objectMostSightings
// No design for this table present in Mikes figma file.
const most_sightings = {};
