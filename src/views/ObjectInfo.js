import React, { useState, useEffect } from "react";
import axios from "axios";
import Info from "../objects/components/Info";
import InfluenceTable from "../objects/components/InfluenceTable";
import HistoryYearDropdown from "../objects/components/HistoryYearDropdown";
import UserSightingsTable from "../objects/components/UserSightingsTable";
import ObservationsFilter from "../objects/components/ObservationsFilter";
import {
  useObjectsState,
  useObjectsDispatch
} from "../objects/objects-context";
import FilterDescription from "../objects/components/FilterDescription";
import Spinner from "../app/components/Spinner";

// check if noradNumber from url is not more than 5 chracters long
// and if it only contains numbers
const isValidNumber = number => {
  if (number.length > 5 || /^\d+$/.test(number) === false) {
    return false;
  }
  return true;
};

export default function ObjectInfo({ match }) {
  const noradNumber = match.params.number;
  console.log(isValidNumber(noradNumber));

  const { observationFilter } = useObjectsState();
  const objectsDispatch = useObjectsDispatch();
  const [isLoading, setIsLoading] = useState(false);

  const [showNumberError, setShowNumberError] = useState(false);

  useEffect(() => {
    const postData = async () => {
      setIsLoading(true);
      await axios
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

          setIsLoading(false);
        })
        // TODO - handle error messaging to return to UI
        .catch(err => console.log(err));
    };

    // only fetch data for a number
    if (isValidNumber(noradNumber)) {
      postData();
    } else {
      setShowNumberError(true);
    }
  }, [noradNumber, objectsDispatch]);

  return showNumberError ? (
    <p className="app__error-message">
      Invalid NORAD Number found in the URL. Please double check the NORAD
      Number you are trying to look up and refresh your browser.
    </p>
  ) : isLoading ? (
    <Spinner />
  ) : (
    <div className="object__wrapper">
      <div className="object-observations__filter-table-wrapper">
        <Info />
        <ObservationsFilter />
        <FilterDescription />
        {observationFilter === "influence" ? <InfluenceTable /> : null}
        {observationFilter === "history" ? <HistoryYearDropdown /> : null}
        {observationFilter === "mySightings" ? <UserSightingsTable /> : null}
      </div>
    </div>
  );
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
// const most_sightings = {};
