import React from "react";
import { Redirect } from "react-router-dom";
import { useAuthState } from "../../auth/auth-context";
import { useProfileState } from "../../profile/profile-context";
import EditProfileSettingInput from "./EditProfileSettingInput";
import CopyText from "../../app/components/CopyText";
import { shortenAddressToolTip, toolTip } from "../../app/app-helpers";
import SavedLocations from "./SavedLocations";

export default function ProfileSettings({
  newUsername,
  setNewUsername,
  newBio,
  setNewBio,
  newLocation,
  setNewLocation,
  showEditProfileInputs,
  setShowEditProfileInputs
}) {
  const { userAddress } = useAuthState();
  const { profileData } = useProfileState();

  return userAddress ? (
    <section className="profile-settings__wrapper">
      <div className="profile-settings__profile-wrapper">
        <h2 className="profile-settings__heading">
          <p>PROFILE</p>
          <p
            className="profile-settings__edit-button-text"
            onClick={() => setShowEditProfileInputs(true)}
          >
            edit
          </p>
        </h2>

        <div className="profile-settings__setting-wrapper">
          <label className="profile-settings__setting-label">USERNAME</label>
          {showEditProfileInputs ? (
            <EditProfileSettingInput
              setting={newUsername}
              setSetting={setNewUsername}
            />
          ) : (
            <p className="profile-settings__setting-value">
              {profileData.user_name}
            </p>
          )}
        </div>

        <div className="profile-settings__setting-wrapper">
          <label className="profile-settings__setting-label">ETH ADDRESS</label>
          <div className="profile-settings__setting-value">
            {shortenAddressToolTip(userAddress)}
          </div>
          <CopyText textToCopy={userAddress} />
        </div>

        {profileData.email ? (
          <div className="profile-settings__setting-wrapper">
            <label className="profile-settings__setting-label">EMAIL</label>

            <p className="profile-settings__setting-value">
              {toolTip(
                profileData.email,
                "This is the address you want to use to recover this account."
              )}
            </p>
          </div>
        ) : null}

        <div className="profile-settings__setting-wrapper">
          <label className="profile-settings__setting-label">LOCATION</label>
          {showEditProfileInputs ? (
            <EditProfileSettingInput
              setting={newLocation}
              setSetting={setNewLocation}
            />
          ) : (
            <p className="profile-settings__setting-value">
              {profileData.user_location
                ? profileData.user_location
                : "undisclosed"}
            </p>
          )}
        </div>

        <div className="profile-settings__setting-wrapper">
          <label className="profile-settings__setting-label">BIO</label>
          {showEditProfileInputs ? (
            <textarea
              className="profile-settings__text-area"
              maxLength="160"
              value={newBio}
              onChange={event => setNewBio(event.target.value)}
            ></textarea>
          ) : (
            <p className="profile-settings__setting-value">
              {profileData.user_bio}
            </p>
          )}
        </div>
      </div>

      <SavedLocations />
    </section>
  ) : (
    <Redirect
      to={{
        pathname: "/login"
      }}
    />
  );
}
