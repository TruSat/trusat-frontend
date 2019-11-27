import React, { useState, useEffect } from "react";
import { useProfileState } from "../../profile/profile-context";
import CircleCheck from "../../assets/CircleCheck.svg";
import DeleteStation from "../../assets/DeleteStation.svg";

export default function SavedLocations() {
  const { profileData } = useProfileState();
  const [isEditing, setIsEditing] = useState(false);
  const [newStationName, setNewStationName] = useState(``);
  const [newNotes, setNewNotes] = useState(``);

  // TODO determine how to edit each name indepentantly of other station names, using the station ID
  useEffect(() => {
    setNewStationName(data.station_name);
  }, []);

  const renderLocations = () => {
    return data.map(station => (
      <tr key={station.station_id}>
        <td>
          {isEditing ? (
            <input
              value={newStationName}
              onChange={event => setNewStationName(event.target.value)}
            />
          ) : (
            `${station.station_name}`
          )}
          {station.notes ? <p>{station.notes}</p> : null}
        </td>
        <td>
          {station.latitude}, {station.longitude}
        </td>
        <td>{station.altitude}</td>
        <td>{station.station_id}</td>
        {isEditing ? null : <td>{station.observation_count}</td>}
        <td>
          {station.default ? <img src={CircleCheck} alt="Yes"></img> : null}
        </td>
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
              <th># OF OBS.</th>
              <th>DEFAULT</th>
            </tr>
          </thead>
          <tbody>{renderLocations()}</tbody>
        </table>
      </div>
    </div>
  );
}

const data = [
  {
    station_name: "my backyard",
    notes: "",
    latitude: "12345",
    longitude: "-54321",
    altitude: "100",
    station_id: "T0001",
    observation_count: "500",
    default: true
  },
  {
    station_name: "Dads house",
    notes: "at the beach",
    latitude: "78901",
    longitude: "-10987",
    altitude: "150",
    station_id: "T0002",
    observation_count: "250",
    default: false
  },
  {
    station_name: "Cascades camping",
    notes: "",
    latitude: "23232",
    longitude: "-32322",
    altitude: "200",
    station_id: "T0003",
    observation_count: "100",
    default: false
  }
];
