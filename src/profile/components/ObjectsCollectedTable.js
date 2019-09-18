import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import ObjectBadge from "../../assets/ObjectBadge.svg";
import { useProfileState } from "../profile-context";
import { renderFlag, shortenAddressToolTip } from "../../app/helpers";
import TablePaginator from "../../app/components/TablePaginator";

export default function ObjectsCollectedTable() {
  const { profileData } = useProfileState();
  const [range, setRange] = useState({ start: 0, end: 10 });

  const renderObjectsCollectedRows = () => {
    const { start, end } = range;
    const rangeData = profileData.objects_observed.slice(start, end);

    return rangeData.map(obj => (
      <tr
        key={profileData.observation_history.indexOf(obj)}
        className="table__body-row profile-table__body-row"
      >
        <td className="table__table-data">
          <NavLink
            key={profileData.objects_observed.indexOf(obj)}
            className="app__nav-link"
            to={`/object/${obj.object_norad_number}`}
          >
            <div className="profile-table__data-wrapper">
              <img src={ObjectBadge} alt="Object Badge"></img>
              &nbsp;
              <p>{obj.object_name}</p>
            </div>
          </NavLink>
        </td>
        <td className="table__table-data">{renderFlag(obj.object_origin)}</td>
        <td className="table__table-data app__hide-on-mobile">
          {obj.object_primary_purpose ? (
            <p>
              {obj.object_primary_purpose}&nbsp;
              {obj.object_secondary_purpose}
            </p>
          ) : (
            <p>purpose unknown</p>
          )}
        </td>
        <td className="table__table-data app__hide-on-mobile">
          {obj.observation_quality}
        </td>
        <td className="table__table-data">
          {obj.username_last_tracked
            ? obj.username_last_tracked
            : shortenAddressToolTip(obj.address_last_tracked)}
        </td>
      </tr>
    ));
  };

  return profileData.objects_observed ? (
    <section className="profile__objects-tracked-wrapper">
      <h2 className="profile__sub-heading">OBJECTS COLLECTED</h2>
      {profileData.objects_observed.length !== 0 ? (
        <table className="table">
          <thead className="table__header">
            <tr>
              <td className="table__header-text">OBJECT</td>
              <td className="table__header-text">ORIGIN</td>
              <td className="table__header-text app__hide-on-mobile">
                PURPOSE
              </td>
              <td className="table__header-text app__hide-on-mobile">
                CONFIDENCE
              </td>
              <td className="table__header-text">LAST SEEN BY</td>
            </tr>
          </thead>
          <tbody className="table__body">{renderObjectsCollectedRows()}</tbody>
        </table>
      ) : (
        <div>
          <NavLink className="app__nav-link" to="/how">
            <p className="profile__none-yet-text">None yet</p>
            <span className="app__yellow-button--small">
              How to track Satellites
            </span>
          </NavLink>
        </div>
      )}

      {profileData.objects_observed.length > 10 ? (
        <TablePaginator
          tableDataLength={profileData.objects_observed.length}
          range={range}
          setRange={setRange}
        />
      ) : null}
    </section>
  ) : null;
}
