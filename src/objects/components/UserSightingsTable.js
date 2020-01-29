import React, { useState, useEffect } from "react";
import { useAuthState } from "../../auth/auth-context";
import { useObjectsState } from "../objects-context";
import {
  shortenAddressToolTip,
  toolTipCopy,
  toolTip,
  renderFlag,
  useTrusatGetApi
} from "../../app/app-helpers";
import TablePaginator from "../../app/components/TablePaginator";
import Spinner from "../../app/components/Spinner";

export default function UserSightingsTable() {
  const { userAddress } = useAuthState();
  const { noradNumber, objectOrigin } = useObjectsState();
  const [range, setRange] = useState({ start: 0, end: 10 });
  const [{ isLoading, isError, data }, doFetch] = useTrusatGetApi();

  useEffect(() => {
    if ((noradNumber, userAddress)) {
      doFetch(
        `/object/userSightings?address=${userAddress}&norad_number=${noradNumber}`
      );
    }
  }, [userAddress, noradNumber, doFetch]);

  const renderUserSightingsRows = () => {
    const { start, end } = range;
    let rangeData = [];

    if (data.user_sightings) {
      rangeData = data.user_sightings.slice(start, end);
    }

    return rangeData.map(obj => {
      return (
        <tr key={data.indexOf(obj)} className="table__body-row">
          <td className="table__table-data">{obj.observation_time}</td>
          <td className="table__table-data app__hide-on-mobile">
            {renderFlag(objectOrigin)}
          </td>
          <td className="table__table-data">
            {obj.user_location ? obj.user_location : "undisclosed"}
          </td>
          <td className="table__table-data app__hide-on-mobile">
            {obj.username
              ? obj.username
              : shortenAddressToolTip(obj.user_address)}
          </td>
          <td className="table__table-data">
            {obj.observation_position_error
              ? obj.observation_position_error.toString().substring(0, 5)
              : null}
          </td>
          <td className="table__table-data">
            {obj.observation_time_difference
              ? obj.observation_time_difference.toString().substring(0, 5)
              : null}
          </td>
          <td className="table__table-data app__hide-on-mobile">
            {obj.observation_cross_track_error
              ? obj.observation_cross_track_error
              : null}
          </td>
          <td className="table__weight-data">
            {/* {obj.observation_weight
              ? obj.observation_weight.toString().substring(0, 5)
              : null} */}
            TBD
          </td>
        </tr>
      );
    });
  };

  return isError ? (
    <p className="app__error-message">Something went wrong...</p>
  ) : isLoading ? (
    <Spinner />
  ) : (
    <React.Fragment>
      <table className="table">
        <thead className="table__header">
          <tr className="table__header-row">
            <th className="table__header-text">
              {toolTip("DATE", toolTipCopy.date)}
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
            <th className="table__header-text app__hide-on-mobile">
              {toolTip("CROSS TRACKE ERR.", toolTipCopy.cross_track_error)}
            </th>
            <th className="table__header-weight-text">
              <p className="app__hide-on-mobile">
                {toolTip("WEIGHT", toolTipCopy.weight)}
              </p>
              <p className="app__hide-on-desktop">WT.</p>
            </th>
          </tr>
        </thead>
        <tbody>{renderUserSightingsRows()}</tbody>
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
