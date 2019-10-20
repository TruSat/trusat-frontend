import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import { useProfileState } from "../profile-context";
import {
  renderFlag,
  toolTip,
  shortenAddressToolTip,
  toolTipCopy
} from "../../app/app-helpers";
import ObjectBadge from "../../app/components/ObjectBadge";
import TablePaginator from "../../app/components/TablePaginator";

export default function ObjectsCollectedTable() {
  const { profileData } = useProfileState();
  const [range, setRange] = useState({ start: 0, end: 10 });

  const renderObjectsCollectedRows = () => {
    const { start, end } = range;
    const rangeData = profileData.objects_observed.slice(start, end);

    return rangeData.map(obj => (
      <tr
        key={obj.object_norad_number}
        className="table__body-row profile-table__body-row"
      >
        <td className="table__table-data">
          <NavLink
            className="app__nav-link"
            to={`/object/${obj.object_norad_number}`}
          >
            <div className="profile-table__data-wrapper">
              <ObjectBadge noradNumber={obj.object_norad_number} size="small" />
              &nbsp;
              {toolTip(obj.object_name, obj.object_norad_number)}
            </div>
          </NavLink>
        </td>
        <td className="table__table-data">{renderFlag(obj.object_origin)}</td>
        <td className="table__table-data app__hide-on-mobile">
          {obj.object_type ? <p>{obj.object_type}</p> : null}
          {obj.object_primary_purpose ? (
            <p>{` - ${obj.object_primary_purpose}`}</p>
          ) : null}
          {obj.object_secondary_purpose ? (
            <p>{` - ${obj.object_secondary_purpose}`}</p>
          ) : null}
        </td>
        <td className="table__table-data app__hide-on-mobile">
          {obj.observation_quality}
        </td>
        <td className="table__table-data">
          <NavLink
            className="app__nav-link"
            to={`/profile/${obj.address_last_tracked}`}
          >
            {obj.username_last_tracked
              ? toolTip(obj.username_last_tracked, obj.address_last_tracked)
              : shortenAddressToolTip(obj.address_last_tracked)}
          </NavLink>
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
              <td className="table__header-text">
                {toolTip("OBJECT", toolTipCopy.object)}
              </td>
              <td className="table__header-text">
                {toolTip("ORIGIN", toolTipCopy.origin)}
              </td>
              <td className="table__header-text app__hide-on-mobile">
                {toolTip("PURPOSE", toolTipCopy.purpose)}
              </td>
              <td className="table__header-text app__hide-on-mobile">
                {toolTip("CONFIDENCE", toolTipCopy.confidence)}
              </td>
              <td className="table__header-text">
                {toolTip("LAST SEEN BY", toolTipCopy.last_seen_by)}
              </td>
            </tr>
          </thead>
          <tbody className="table__body">{renderObjectsCollectedRows()}</tbody>
        </table>
      ) : (
        <div className="profile__none-yet-wrapper">
          <p className="profile__none-yet-text">None yet</p>
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
