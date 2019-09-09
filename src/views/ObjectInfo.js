import React, { useState, useEffect } from "react";
import axios from "axios";
import Astriagraph from "../app/components/Astriagraph";
import Info from "../objects/components/Info";
import InfluenceTable from "../objects/components/InfluenceTable";
import HistoryYearDropdown from "../objects/components/HistoryYearDropdown";
import UserSightingsTable from "../objects/components/UserSightingsTable";
import ObservationsFilter from "../objects/components/ObservationsFilter";
import {
  useObjectsState,
  useObjectsDispatch
} from "../objects/objects-context";

export default function ObjectInfo({ match }) {
  const noradNumber = match.params.number;
  console.log(noradNumber);

  const { observationFilter } = useObjectsState();
  const objectsDispatch = useObjectsDispatch();

  const [showObjectView, setShowObjectView] = useState(false);

  useEffect(() => {
    axios
      .post(
        `https://api.consensys.space:8080/object/info`,
        JSON.stringify({ norad_number: noradNumber })
      )
      .then(result => {
        objectsDispatch({ type: "SET_NORAD_NUMBER", payload: noradNumber });
        objectsDispatch({ type: "SET_OBJECT_INFO", payload: result.data });
        objectsDispatch({
          type: "SET_OBJECT_ORIGIN",
          payload: result.data.object_origin
        });

        setShowObjectView(true);
      })
      .catch(err => console.log(err));
  }, [noradNumber, objectsDispatch]);

  return showObjectView ? (
    <div className="object__wrapper">
      <Astriagraph />

      <Info />

      <h1 className="object-observations__header">OBSERVATIONS</h1>

      <ObservationsFilter />

      {observationFilter === "influence" ? <InfluenceTable /> : null}
      {observationFilter === "history" ? <HistoryYearDropdown /> : null}
      {observationFilter === "mySightings" ? <UserSightingsTable /> : null}
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
