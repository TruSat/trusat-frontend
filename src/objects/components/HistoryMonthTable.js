import React, { useState, Fragment } from "react";
import { NavLink } from "react-router-dom";
import { useObjectsState } from "../objects-context";
import {
  renderFlag,
  toolTip,
  shortenAddressToolTip,
  toolTipCopy
} from "../../app/app-helpers";
import TablePaginator from "../../app/components/TablePaginator";

export default function HistoryMonthTable({ monthName, monthData }) {
  const { objectOrigin } = useObjectsState();
  const [range, setRange] = useState({ start: 0, end: 10 });

  const renderDayRows = () => {
    const { start, end } = range;
    const rangeData = monthData.slice(start, end);

    return rangeData.map(observation => (
      <tr key={observation.observation_time} className="table__body-row">
        <td className="table__table-data">{observation.observation_date}</td>
        <td className="table__table-data app__hide-on-mobile">
          {renderFlag(objectOrigin)}
        </td>
        <td className="table__table-data">
          {observation.user_location
            ? observation.user_location
            : "undisclosed"}
        </td>
        <td className="table__table-data app__hide-on-mobile">
          <NavLink
            className="app__nav-link"
            to={`/profile/${observation.user_address}`}
          >
            {observation.username
              ? toolTip(observation.username, observation.user_address)
              : shortenAddressToolTip(observation.user_address)}
          </NavLink>
        </td>
        <td className="table__table-data">
          {observation.observation_position_error}
        </td>
        <td className="table__table-data">
          {observation.observation_time_difference}
        </td>
        <td className="table__table-data app__hide-on-mobile">
          {observation.observation_cross_track_error}
        </td>
        <td className="table__weight-data">
          {observation.observation_weight}%
        </td>
      </tr>
    ));
  };

  return monthData.length !== 0 ? (
    <Fragment>
      <table className="table history-month-table">
        <thead className="table__header">
          <tr className="table__header-row">
            <th className="table__month-text">
              {monthName.substring(0, 3).toUpperCase()}
            </th>
            <th className="app__hide-on-mobile"></th>
            <th className="table__header-text">
              {toolTip("LOCATION", toolTipCopy.location)}
            </th>
            <th className="table__header-text app__hide-on-mobile">
              {toolTip("USER", toolTipCopy.user)}
            </th>
            <th className="table__header-text">
              <p className="app__hide-on-mobile">
                {toolTip("POSITION ERR.", toolTipCopy.position_error)}
              </p>

              <p className="app__hide-on-desktop">POS ERR.</p>
            </th>
            <th className="table__header-text">
              <p className="app__hide-on-mobile">
                {toolTip("TIME ERR.", toolTipCopy.time_error)}
              </p>
              <p className="app__hide-on-desktop">TIME ERR.</p>
            </th>
            <th className="table__header-text">
              <p className="app__hide-on-mobile">
                {toolTip("CROSS TRACK ERR.", toolTipCopy.cross_track_error)}
              </p>
            </th>
            <th className="table__header-weight-text">
              <p className="app__hide-on-mobile">
                {toolTip("WEIGHT", toolTipCopy.weight)}
              </p>
              <p className="app__hide-on-desktop">WT.</p>
            </th>
          </tr>
        </thead>
        <tbody>{renderDayRows()}</tbody>
      </table>
      {/* TODO - set tableDataLength to the observation count */}
      {monthData.length > 10 ? (
        <TablePaginator
          tableDataLength={monthData.length}
          range={range}
          setRange={setRange}
        />
      ) : null}
    </Fragment>
  ) : null;
}
