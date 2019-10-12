import React, { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import { useObjectsState } from "../objects-context";
import {
  toolTip,
  shortenAddressToolTip,
  toolTipCopy,
  useTrusatGetApi
} from "../../app/app-helpers";
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

    console.log(data);
  }, [noradNumber, doFetch, data]);

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

        <td className="table__table-data">{obj.observation_position_error}</td>
        <td className="table__table-data">
          {obj.observation_time_difference
            ? obj.observation_time_difference.toString().substring(0, 4)
            : null}
        </td>
        <td className="table__table-data">
          {obj.observation_cross_track_error}
        </td>
        <td className="table__weight-data">{obj.observation_weight}</td>
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
            <th className="table__header-text object-inluence-table__table-header-text ">
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
                {toolTip("POSITION ERR.", toolTipCopy.position_error)}
              </p>
              <p className="app__hide-on-desktop">POS ERR.</p>
            </th>
            <th className="table__header-text object-inluence-table__table-header-text">
              <p className="app__hide-on-mobile">
                {toolTip("TIME ERR.", toolTipCopy.time_error)}
              </p>
              <p className="app__hide-on-desktop">TIME ERR.</p>
            </th>
            <th className="table__header-text object-inluence-table__table-header-text">
              <p className="app__hide-on-mobile">
                {toolTip("CROSS TRACK ERR.", toolTipCopy.cross_track_error)}
              </p>
              <p className="app__hide-on-desktop">CT ERR.</p>
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
