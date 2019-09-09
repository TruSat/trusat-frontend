import React, { useState, useEffect } from "react";
import axios from "axios";
import Astriagraph from "../app/components/Astriagraph";
import Info from "../objects/components/Info";
import InfluenceTable from "../objects/components/InfluenceTable";
import HistoryYearDropdown from "../objects/components/HistoryYearDropdown";
import UserSightingsTable from "../objects/components/UserSightingsTable";
import DownloadObjectTleButton from "../objects/components/DownloadObjectTleButton";
import { useObjectsDispatch } from "../objects/objects-context";

export default function ObjectInfo({ match }) {
  const noradNumber = match.params.number;
  const objectsDispatch = useObjectsDispatch();
  const [observationFilter, setObservationFilter] = useState("influence");
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
    <div className="object__wrapper">
      <Astriagraph />

      <Info noradNumber={noradNumber} />

      <h1 className="object-observations__header">OBSERVATIONS</h1>

      <section className="object-observations__nav">
        <div className="object-observations__nav-link-wrapper">
          <span
            className="object-observations__nav-link"
            onClick={() => setObservationFilter("influence")}
          >
            Influence
          </span>
          <span
            className="object-observations__nav-link"
            onClick={() => setObservationFilter("history")}
          >
            History
          </span>
          <span
            className="object-observations__nav-link"
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
