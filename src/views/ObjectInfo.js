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
  const [{ data, isLoading, isError }, doPost, withData] = useTrusatPostApi();
  const { observationFilter } = useObjectsState();
  const objectsDispatch = useObjectsDispatch();
  const [showNumberError, setShowNumberError] = useState(false);

  useEffect(() => {
    // only fetch data for a potentially valid norad number
    if (isValidNumber(noradNumber)) {
      doPost(`https://api.consensys.space:8080/object/info`);
      withData(
        JSON.stringify({
          norad_number: noradNumber
        })
      );
    } else {
      setShowNumberError(true);
    }

    if (data) {
      objectsDispatch({ type: "SET_NORAD_NUMBER", payload: noradNumber });
      objectsDispatch({ type: "SET_OBJECT_INFO", payload: data });
      objectsDispatch({
        type: "SET_OBJECT_ORIGIN",
        payload: data.object_origin
      });
    }
  }, [noradNumber, data, withData, doPost, objectsDispatch]);

  return (
    <Fragment>
      {isLoading ? (
        <Spinner />
      ) : (
        <Fragment>
          {showNumberError ? (
            <p className="app__error-message">
              Invalid NORAD Number found in the URL. Please double check the
              NORAD Number you are trying to look up and refresh your browser.
            </p>
          ) : isError ? (
            <p className="app__error-message">Something went wrong ...</p>
          ) : (
            <div className="object__wrapper">
              <div className="object-observations__filter-table-wrapper">
                <Info />
                <ObservationsFilter />
                <FilterDescription />
                {observationFilter === "influence" ? <InfluenceTable /> : null}
                {observationFilter === "history" ? (
                  <HistoryYearDropdown />
                ) : null}
                {observationFilter === "mySightings" ? (
                  <UserSightingsTable />
                ) : null}
              </div>
            </div>
          )}
        </Fragment>
      )}
    </Fragment>
  );
}

// /* // {showNumberError ? (
// //     <p className="app__error-message">
// //       Invalid NORAD Number found in the URL. Please double check the NORAD
// //       Number you are trying to look up and refresh your browser.
// //     </p>
// //   ) : null}

// POST REQUEST
// /objectInfo
// receives Norad Number and returns an object.
// const object_info =
//   object_origin: "russia"
// };

// POST request
// /objectMostSightings
// No design for this table present in Mikes figma file.
// const most_sightings = {}; */
