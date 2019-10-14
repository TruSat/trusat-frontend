import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import { toolTip, toolTipCopy } from "../../app/app-helpers";
import { useProfileState } from "../profile-context";
import { useAuthState } from "../../auth/auth-context";
import TablePaginator from "../../app/components/TablePaginator";

export default function ObservationsTable() {
  const { userAddress } = useAuthState();
  const { profileData } = useProfileState();
  const [range, setRange] = useState({ start: 0, end: 10 });

  const renderYourObservationsRows = () => {
    const { start, end } = range;
    const rangeData = profileData.observation_history.slice(start, end);

    return rangeData.map(observation => (
      <tr
        key={profileData.observation_history.indexOf(observation)}
        className="table__body-row"
      >
        <td className="table__table-data">{observation.observation_time}</td>
        <td className="table__table-data">
          <NavLink
            className="app__nav-link"
            to={`/object/${observation.object_norad_number}`}
          >
            {toolTip(observation.object_name, observation.object_norad_number)}
          </NavLink>
        </td>
        <td className="table__table-data">
          {observation.observation_position_error
            ? observation.observation_position_error.toString().substring(0, 5)
            : null}
        </td>
        <td className="table__table-data">
          {observation.observation_time_difference
            ? observation.observation_time_difference.toString().substring(0, 5)
            : null}
        </td>
        <td className="table__table-data app__hide-on-mobile">
          {observation.observation_cross_track_error}
        </td>
        <td className="table__table-data">
          {observation.observation_weight
            ? observation.observation_weight.toString().substring(0, 5)
            : null}
        </td>
      </tr>
    ));
  };

  return profileData.observation_history ? (
    <section className="profile__your-observations-wrapper">
      <h2 className="profile__sub-heading">
        {userAddress === profileData.user_address
          ? "YOUR OBSERVATIONS"
          : "OBSERVATIONS"}
      </h2>
      <table className="table">
        <thead className="table__header">
          <tr>
            <td className="table__header-text">
              {toolTip("DATE", toolTipCopy.date)}
            </td>
            <td className="table__header-text">
              {toolTip("OBJECT", toolTipCopy.object)}
            </td>
            <td className="table__header-text">
              <p className="app__hide-on-mobile">
                {toolTip("POSITION ERR.", toolTipCopy.position_error)}
              </p>
              <p className="app__hide-on-desktop">POS ERR.</p>
            </td>
            <td className="table__header-text">
              <p className="app__hide-on-mobile">
                {toolTip("TIME ERR.", toolTipCopy.time_error)}
              </p>
              <p className="app__hide-on-desktop">TIME ERR.</p>
            </td>
            <td className="table__header-text">
              <p className="app__hide-on-mobile">
                {toolTip("CROSS TRACK ERR.", toolTipCopy.cross_track_error)}
              </p>
            </td>
            <td className="table__header-text">
              <p className="app__hide-on-mobile">
                {toolTip("WEIGHT", toolTipCopy.weight)}
              </p>
              <p className="app__hide-on-desktop">WT.</p>
            </td>
          </tr>
        </thead>
        <tbody className="table__body">
          {profileData.observation_history.length !== 0 ? (
            renderYourObservationsRows()
          ) : (
            <tr>
              <td className="profile__none-yet-text">None yet</td>
            </tr>
          )}
        </tbody>
      </table>

      {profileData.observation_history.length > 10 ? (
        <TablePaginator
          tableDataLength={profileData.observation_history.length}
          range={range}
          setRange={setRange}
        />
      ) : null}
    </section>
  ) : null;
}
