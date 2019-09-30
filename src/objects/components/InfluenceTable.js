import React, { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import { useObjectsState } from "../objects-context";
import {
  toolTip,
  shortenAddressToolTip,
  toolTipCopy,
  useTrusatGetApi
} from "../../app/helpers";
import TablePaginator from "../../app/components/TablePaginator";
import Spinner from "../../app/components/Spinner";

export default function InfluenceTable() {
  const { noradNumber } = useObjectsState();
  const [range, setRange] = useState({ start: 0, end: 10 });
  const [{ data, isLoading, isError }, doFetch] = useTrusatGetApi();

  useEffect(() => {
    if (noradNumber) {
      doFetch(`/object/influence?norad_number=${noradNumber}`);
    }
  }, [noradNumber, doFetch]);

  const renderInfluenceRows = () => {
    const { start, end } = range;
    const rangeData = data.slice(start, end);

    return rangeData.map(obj => (
      <tr key={data.indexOf(obj)} className="table__body-row">
        <td className="table__table-data">{obj.observation_time}</td>
        <td className="table__table-data app__hide-on-mobile">
          <NavLink
            className="app__nav-link"
            to={`/profile/${obj.user_address}`}
          >
            {obj.username
              ? toolTip(obj.username, obj.user_address)
              : shortenAddressToolTip(obj.user_address)}
          </NavLink>
        </td>
        <td className="table__table-data">
          <div style={{ display: "flex" }}>
            {obj.user_location ? obj.user_location : "undisclosed"}
          </div>
        </td>

        <td className="table__table-data">{obj.observation_quality}</td>
        <td className="table__table-data">
          {obj.observation_time_difference.substring(0, 4)}
        </td>
        <td className="table__weight-data">
          {obj.observation_weight.substring(0, 4)}
        </td>
      </tr>
    ));
  };

  return isError ? (
    <p className="app__error-message">Something went wrong...</p>
  ) : isLoading ? (
    <Spinner />
  ) : (
    <React.Fragment>
      <table className="table object-influence-table">
        <thead className="table__header">
          <tr className="table__header-row">
            <th className="table__header-text object-inluence-table__table-header-text">
              {toolTip("DATE", toolTipCopy.date)}
            </th>
            <th className="table__header-text app__hide-on-mobile">
              {toolTip("TRACKED BY", toolTipCopy.tracked_by)}
            </th>
            <th className="table__header-text object-inluence-table__table-header-text">
              {toolTip("LOCATION", toolTipCopy.location)}
            </th>
            <th className="table__header-text object-inluence-table__table-header-text">
              <p className="app__hide-on-mobile">
                {toolTip("QUALITY", toolTipCopy.quality)}
              </p>
              <p className="app__hide-on-desktop">QUAL..</p>
            </th>
            <th className="table__header-text object-inluence-table__table-header-text">
              <p className="app__hide-on-mobile">
                {toolTip("TIME DIFF", toolTipCopy.time_diff)}
              </p>
              <p className="app__hide-on-desktop">DIFF..</p>
            </th>
            <th className="table__header-weight-text">
              <p className="app__hide-on-mobile">
                {toolTip("WEIGHT", toolTipCopy.weight)}
              </p>
              <p className="app__hide-on-desktop">WT.</p>
            </th>
          </tr>
        </thead>
        <tbody className="table__body">{renderInfluenceRows()}</tbody>
      </table>

      {data.length > 10 ? (
        <TablePaginator
          tableDataLength={data.length}
          range={range}
          setRange={setRange}
        />
      ) : null}
    </React.Fragment>
  );
}

// POST request
// /objectInfluence
// receives Norad Number and returns and array of objects
// Lists the most influential users who have helped to create the LATEST TLE with an accurate sighting
// Weight should add up to 100%
// sorted by most influence
// const object_influence = [
//   {
//     observation_time: "1550398277",
//     username: "Leo Barhorst",
//     user_address: "0x1863a72A0244D603Dcd00CeD99b94d517207716a", // always needed as a fallback in event the user has not not created a username
//     user_location: "Brooklyn, USA", // only available if the user has made it publicly available
//     observation_quality: "34", // quality/accuracy of the individual observastion
//     observation_time_difference: "1.42", // this will be a positive or negative number in seconds
//     observation_weight: "33" // a percentage value
//   },
//   {
//     observation_time: "1550398277",
//     username: "Jim Smith",
//     user_address: "0x1863a72A0244D603Dcd00CeD99b94d517207716a",
//     user_location: "Los Angeles, USA",
//     observation_quality: "45",
//     observation_time_difference: "1.42",
//     observation_weight: "33"
//   },
//   {
//     observation_time: "1550398277",
//     username: "Joe Bloggs",
//     user_address: "0x1863a72A0244D603Dcd00CeD99b94d517207716a",
//     user_location: "London, UK",
//     observation_quality: "20",
//     observation_time_difference: "1.42",
//     observation_weight: "33"
//   }
// ];
