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
import { useTrusatPostApi } from "../app/helpers";

// Check if noradNumber from url is not more than 5 chracters long
// and if it only contains numbers
const isValidNumber = number => {
  if (number.length > 5 || /^\d+$/.test(number) === false) {
    return false;
  }
  return true;
};

export default function ObjectInfo({ match }) {
  const noradNumber = match.params.number;
  const [{ data, isLoading, isError }, doPost, withData] = useTrusatPostApi();
  const { observationFilter } = useObjectsState();
  const objectsDispatch = useObjectsDispatch();
  const [isNumberError, setIsNumberError] = useState(false);

  useEffect(() => {
    // only fetch data for a potentially valid norad number
    if (isValidNumber(noradNumber)) {
      doPost(`/object/info`);
      withData(
        JSON.stringify({
          norad_number: noradNumber
        })
      );
    } else {
      setIsNumberError(true);
    }

    if (data) {
      console.log(data);
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
  }, [noradNumber, data, doPost, withData, objectsDispatch]);

  return isNumberError ? (
    <p className="app__error-message">
      Invalid NORAD Number found in the URL. Please double check the NORAD
      Number you are trying to look up and refresh your browser.
    </p>
  ) : isLoading ? (
    <Spinner />
  ) : (
    <Fragment>
      {isError || data.length === 0 ? (
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
