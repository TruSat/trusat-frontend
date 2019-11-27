import React, { Fragment } from "react";
import { toolTip, toolTipCopy } from "../../app/app-helpers";
import { useProfileState } from "../../profile/profile-context";

export default function SavedLocations() {
  const { profileData } = useProfileState();

  const renderLocations = () => {
    return data.map(station => (
      <tr key={station.station_id}>
        <td>{station.station_name}</td>
        <td>
          {station.latitude}, {station.longitude}
        </td>
        <td>{station.station_id}</td>
        <td>{station.observation_count}</td>
      </tr>
    ));
  };

  return (
    <div className="saved-locations__wrapper">
      <h2 className="profile-settings__heading">
        <p>SAVED LOCATIONS</p>
        <p className="profile-settings__edit-button-text">Edit locations</p>
        <p className="profile-settings__edit-button-text">Add location</p>
      </h2>

      <div className="profile-settings__station-text-wrapper">
        <table className="table">
          <thead className="table__header">
            <tr className="table__header-row">
              <th>NAME</th>
              <th>LAT,LON</th>
              <th>STATION ID</th>
              <th># OF OBS.</th>
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
    // altitude: '100'
    station_id: "T0001",
    observation_count: "500",
    default: true
  },
  {
    station_name: "Dads house",
    notes: "at the beach",
    latitude: "78901",
    longitude: "-10987",
    // altitude: '100'
    station_id: "T0002",
    observation_count: "250",
    default: false
  },
  {
    station_name: "Cascades camping",
    notes: "",
    latitude: "23232",
    longitude: "-32322",
    // altitude: '100'
    station_id: "T0003",
    observation_count: "100",
    default: false
  }
];
