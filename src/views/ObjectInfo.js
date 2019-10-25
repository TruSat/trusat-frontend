import React, { Fragment, useState, useEffect } from "react";
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
import { useTrusatGetApi } from "../app/app-helpers";

// Check if noradNumber from url is not more than 5 characters long
// and if it only contains numbers
const isValidNumber = number => {
  if (number.length > 5 || /^\d+$/.test(number) === false) {
    return false;
  }
  return true;
};

export default function ObjectInfo({ match }) {
  const noradNumber = match.params.number;
  const [{ data, isLoading, isError }, doFetch] = useTrusatGetApi();
  const { observationFilter } = useObjectsState();
  const objectsDispatch = useObjectsDispatch();
  const [isNumberError, setIsNumberError] = useState(false);

  useEffect(() => {
    // only fetch data for a potentially valid norad number
    if (!isValidNumber(noradNumber)) {
      setIsNumberError(true);
    } else {
      doFetch(`/object/info?norad_number=${noradNumber}`);
    }

    if (data.length !== 0) {
      objectsDispatch({ type: "SET_NORAD_NUMBER", payload: noradNumber });
      objectsDispatch({ type: "SET_OBJECT_INFO", payload: data });
      objectsDispatch({
        type: "SET_OBJECT_ORIGIN",
        payload: data.object_origin
      });
      objectsDispatch({
        type: "SET_YEAR_LAUNCHED",
        payload: data.year_launched
      });
    }
  }, [noradNumber, data, doFetch, objectsDispatch]);

  return isNumberError ? (
    <p className="app__error-message">
      Invalid NORAD Number found in the URL. Please double check the NORAD
      Number you are trying to look up and refresh your browser.
    </p>
  ) : isLoading ? (
    <Spinner />
  ) : (
    <Fragment>
      {isError ? (
        <p className="app__error-message">Something went wrong ...</p>
      ) : (
        <div className="object__wrapper">
          <div className="object-observations__filter-table-wrapper">
            <Info />
            <ObservationsFilter />
            <FilterDescription />
            {observationFilter === "influence" ? <InfluenceTable /> : null}
            {observationFilter === "history" ? <HistoryYearDropdown /> : null}
            {observationFilter === "mySightings" ? (
              <UserSightingsTable />
            ) : null}
          </div>
        </div>
      )}
    </Fragment>
  );
}
