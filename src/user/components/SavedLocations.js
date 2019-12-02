import React, { useState, useEffect, Fragment } from "react";
import { NavLink } from "react-router-dom";
import { useProfileState } from "../../profile/profile-context";
import DeleteStation from "../../assets/DeleteStation.svg";
import Button from "../../app/components/Button";

// TODO - move this up inside the `AccountSettings` component and follow the same logic used to edit the profile settings
export default function SavedLocations() {
  const { profileData } = useProfileState();
  const [isEditing, setIsEditing] = useState(false);
  // this will be pulled from profileData - reference how this is done with profile settings
  // this will be sent to the API
  const [newLocationData, setNewLocationData] = useState([
    {
      station_name: "my backyard",
      notes: "",
      latitude: "12345",
      longitude: "-54321",
      altitude: "100",
      station_id: "T0001",
      observation_count: "500"
    },
    {
      station_name: "Dads house",
      notes: "at the beach",
      latitude: "78901",
      longitude: "-10987",
      altitude: "150",
      station_id: "T0002",
      observation_count: "250"
    },
    {
      station_name: "Cascades camping",
      notes: "",
      latitude: "23232",
      longitude: "-32322",
      altitude: "200",
      station_id: "T0003",
      observation_count: "100"
    }
  ]);

  const editStationName = ({ stationId, newName }) => {
    setNewLocationData(
      newLocationData.map(station =>
        station.station_id === stationId
          ? { ...station, station_name: newName }
          : station
      )
    );
  };

  const editStationNotes = ({ stationId, newNotes }) => {
    setNewLocationData(
      newLocationData.map(station =>
        station.station_id === stationId
          ? { ...station, notes: newNotes }
          : station
      )
    );
  };

  const deleteStation = stationId => {
    setNewLocationData(
      newLocationData.filter(station => station.station_id !== stationId)
    );
  };

  const renderLocations = () => {
    return newLocationData.map(station => (
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
            onClick={() => setIsEditing(false)}
          />
        </div>
      ) : null}
    </div>
  );
}
