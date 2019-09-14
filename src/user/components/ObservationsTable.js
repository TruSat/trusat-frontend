import React from "react";
import { useUserState } from "../user-context";

export default function ObservationsTable() {
  const { userData } = useUserState();

  const renderYourObservationsRows = () => {
    return userData.observation_history.map(observation => (
      <tr
        key={userData.observation_history.indexOf(observation)}
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

  return (
    <section className="profile__your-observations-wrapper">
      <h2 className="profile__sub-heading">YOUR OBSERVATIONS</h2>
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
          {userData.observation_history.length !== 0 ? (
            renderYourObservationsRows()
          ) : (
            <p className="profile__none-yet-text">None yet</p>
          )}
        </tbody>
      </table>
    </section>
  );
}
