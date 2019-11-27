import React, { useState, useEffect } from "react";
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

  const renderLocations = () => {
    return newLocationData.map(station => (
      <tr key={station.station_id}>
        <td>
          {isEditing ? (
            <input value={station.station_name} />
          ) : (
            `${station.station_name}`
          )}
          {isEditing && station.notes ? (
            <p>
              <input value={station.notes} />
            </p>
          ) : null}
        </td>
        <td>
          {station.latitude}, {station.longitude}
        </td>
        <td>{station.altitude}</td>
        <td>{station.station_id}</td>
        {isEditing ? null : <td>{station.observation_count}</td>}
        {isEditing ? (
          <td>
            <img src={DeleteStation} alt="delete station"></img>
          </td>
        ) : null}
      </tr>
    ));
  };

  return (
    <div className="saved-locations__wrapper">
      <h2 className="profile-settings__heading">
        <p>SAVED LOCATIONS</p>
        {isEditing ? null : (
          <p
            className="profile-settings__edit-button-text"
            onClick={() => setIsEditing(true)}
          >
            Edit locations
          </p>
        )}

        <p className="profile-settings__edit-button-text">Add location</p>
      </h2>

      <div className="profile-settings__station-text-wrapper">
        <table className="table">
          <thead className="table__header">
            <tr className="table__header-row">
              <th>NAME</th>
              <th>LAT.,LON.</th>
              <th>ALT.</th>
              <th>STATION ID</th>
              <th>{isEditing ? null : `# OF OBS.`}</th>
            </tr>
          </thead>
          <tbody>{renderLocations()}</tbody>
        </table>
      </div>
      {isEditing ? (
        <Button
          text="Save"
          color="orange"
          addStyles="saved-locations__save-button"
          onClick={() => setIsEditing(false)}
        />
      ) : null}
    </div>
  );
}
