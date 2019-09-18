import React, { useState } from "react";
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
        <td className="table__table-data">{observation.object_name}</td>
        <td className="table__table-data">{observation.observation_quality}</td>
        <td className="table__table-data">
          {observation.observation_time_difference.substring(0, 4)}
        </td>
        <td className="table__table-data">
          {observation.observation_weight.substring(0, 4)}
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
            <td className="table__header-text">DATE</td>
            <td className="table__header-text">OBJECT</td>
            <td className="table__header-text">
              <p className="app__hide-on-mobile">QUALITY</p>
              <p className="app__hide-on-desktop">QUAL..</p>
            </td>
            <td className="table__header-text">
              <p className="app__hide-on-mobile">TIME DIFF</p>
              <p className="app__hide-on-desktop">DIFF..</p>
            </td>
            <td className="table__header-text">
              <p className="app__hide-on-mobile">WEIGHT</p>
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
