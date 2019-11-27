import React, { Fragment } from "react";
import { toolTip, toolTipCopy } from "../../app/app-helpers";
import { useProfileState } from "../../profile/profile-context";

export default function SavedLocations() {
  const { profileData } = useProfileState();

  return (
    <div className="profile-settings__observation-wrapper">
      <h2 className="profile-settings__heading">OBSERVATION STATIONS</h2>

      <div className="profile-settings__station-text-wrapper">
        {profileData.observation_stations.length !== 0 ? (
          profileData.observation_stations.map(station => {
            return <p className="profile-settings__station-text">{station}</p>;
          })
        ) : (
          <Fragment>
            {toolTip(`None... ?`, toolTipCopy.observation_station)}
          </Fragment>
        )}
      </div>
    </div>
  );
}
