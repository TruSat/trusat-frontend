import React, { useState, useEffect } from "react";
import axios from "axios";
import Info from "../objects/components/Info";
import InfluenceTable from "../objects/components/InfluenceTable";
import HistoryYearDropdown from "../objects/components/HistoryYearDropdown";
import UserSightingsTable from "../objects/components/UserSightingsTable";
import DownloadObjectTleButton from "../objects/components/DownloadObjectTleButton";
import { useObjectsDispatch } from "../objects/objects-context";

export default function ObjectInfo({ match }) {
  const noradNumber = match.params.number;
  const objectsDispatch = useObjectsDispatch();
  const [observationFilter, setObservationFilter] = useState("history");
  const [showObjectView, setShowObjectView] = useState(false);

  useEffect(() => {
    axios
      .post(
        `https://api.consensys.space:8080/object/info`,
        JSON.stringify({ norad_number: noradNumber })
      )
      .then(result => {
        console.log(result.data);
        objectsDispatch({ type: "SET_OBJECT_INFO", payload: result.data });
        setShowObjectView(true);
      })
      .catch(err => console.log(err));
  }, [noradNumber, objectsDispatch]);

  return showObjectView ? (
    <div>
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
        <InfluenceTable noradNumber={noradNumber} />
      ) : null}
      {observationFilter === "history" ? (
        <HistoryYearDropdown noradNumber={noradNumber} />
      ) : null}
      {observationFilter === "userSightings" ? (
        <UserSightingsTable noradNumber={noradNumber} />
      ) : null}
    </div>
  ) : null;
}

// POST REQUEST
// /objectInfo
// receives Norad Number and returns an object.
// const object_info = {
//   object_origin: "russia"
// };

// POST request
// /objectMostSightings
// No design for this table present in Mikes figma file.
const most_sightings = {};
