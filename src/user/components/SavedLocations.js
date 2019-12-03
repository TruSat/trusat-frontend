import React, { useState, Fragment } from "react";
import { NavLink } from "react-router-dom";
import { useProfileState } from "../../profile/profile-context";
import DeleteStation from "../../assets/DeleteStation.svg";
import Button from "../../app/components/Button";

export default function SavedLocations({
  newStationData,
  setNewStationData,
  newStationNames,
  setNewStationNames,
  newStationNotes,
  setNewStationNotes,
  deletedStations,
  setDeletedStations,
  submitEdit
}) {
  // TODO - add station data from profileData to the table values, reference ProfileSettings component
  const { profileData } = useProfileState();
  const [isEditing, setIsEditing] = useState(false);

  const editStationName = ({ stationId, newName }) => {
    // used for table render
    setNewStationData(
      newStationData.map(station =>
        station.station_id === stationId
          ? { ...station, station_name: newName }
          : station
      )
    );
    // update the name for this given station
    setNewStationNames({ ...newStationNames, [stationId]: newName });
  };

  const editStationNotes = ({ stationId, newNotes }) => {
    // used for table render
    setNewStationData(
      newStationData.map(station =>
        station.station_id === stationId
          ? { ...station, notes: newNotes }
          : station
      )
    );
    // Update the notes for this given station
    setNewStationNotes({ ...newStationNotes, [stationId]: newNotes });
  };

  const deleteStation = stationId => {
    // used for table render
    setNewStationData(
      newStationData.filter(station => station.station_id !== stationId)
    );
    // add stationID to an array of stations to be deleted
    setDeletedStations([...deletedStations, stationId]);
  };

  const renderLocations = () => {
    return newStationData.map(station => (
      <tr key={station.station_id}>
        <td className="locations-table__table-data">
          {isEditing ? (
            <input
              className="edit-profile-settings-input"
              value={station.station_name}
              onChange={event =>
                editStationName({
                  newName: event.target.value,
                  stationId: station.station_id
                })
              }
            />
          ) : (
            <Fragment>
              <p className="locations-table__name-data">
                {station.station_name}
              </p>
              <p>{station.notes ? station.notes : null}</p>
            </Fragment>
          )}
          {isEditing && station.notes ? (
            <p style={{ marginTop: "1em" }}>
              <input
                className="edit-profile-settings-input"
                value={station.notes}
                onChange={event =>
                  editStationNotes({
                    newNotes: event.target.value,
                    stationId: station.station_id
                  })
                }
              />
            </p>
          ) : null}
        </td>
        <td className="locations-table__table-data">
          {station.latitude}, {station.longitude}
        </td>
        <td className="locations-table__table-data">{station.altitude}</td>
        <td className="locations-table__table-data">{station.station_id}</td>
        {isEditing ? null : (
          <td className="locations-table__table-data">
            {station.observation_count}
          </td>
        )}
        {isEditing ? (
          <td className="locations-table__table-data">
            <img
              src={DeleteStation}
              alt="delete station"
              onClick={() => deleteStation(station.station_id)}
            ></img>
          </td>
        ) : null}
      </tr>
    ));
  };

  return (
    <div className="saved-locations__wrapper">
      <h2 className="saved-locations__heading">
        <p>SAVED LOCATIONS</p>
        {isEditing ? null : (
          <p
            className="profile-settings__edit-button-text"
            onClick={() => setIsEditing(true)}
          >
            Edit locations
          </p>
        )}
        <NavLink className="app__nav-link" to="/settings/stations">
          <p className="profile-settings__edit-button-text">Add location</p>
        </NavLink>
      </h2>

      <div className="profile-settings__station-text-wrapper">
        <table className="table">
          <thead className="table__header">
            <tr className="table__header-row locations-table__header-row">
              <th className="table__header-text">NAME</th>
              <th className="table__header-text">LAT.,LON.</th>
              <th className="table__header-text">ALT.</th>
              <th className="table__header-text">STATION ID</th>
              <th className="table__header-text">
                {isEditing ? null : `# OF OBS.`}
              </th>
            </tr>
          </thead>
          <tbody>{renderLocations()}</tbody>
        </table>
      </div>
      {isEditing ? (
        <div className="saved-locations__button-wrapper">
          {/* Cancel will return the render to the profileData   */}
          <Button
            text="Cancel"
            color="white"
            addStyles="saved-locations__cancel-button"
            onClick={() => setIsEditing(false)}
          />

          <Button
            text="Save"
            color="orange"
            addStyles="saved-locations__save-button"
            onClick={() => {
              submitEdit();
              setIsEditing(false);
            }}
          />
        </div>
      ) : null}
    </div>
  );
}
