import React, { useState } from "react";
import { useAuthState } from "../../auth/auth-context";
import { useProfileState } from "../../profile/profile-context";
import EditProfileSettingInput from "./EditProfileSettingInput";
import CopyText from "../../app/components/CopyText";
import { shortenAddressToolTip, toolTip } from "../../app/app-helpers";
import Button from "../../app/components/Button";

export default function ProfileSettings({
  newUsername,
  setNewUsername,
  newBio,
  setNewBio,
  newLocation,
  setNewLocation,
  submitEdit
}) {
  const { userAddress } = useAuthState();
  const { profileData } = useProfileState();
  const [isEditing, setIsEditing] = useState(false);

  return (
    <div className="profile-settings__profile-wrapper">
      <h2 className="profile-settings__heading">
        <p>PROFILE</p>
        <p
          className="profile-settings__edit-button-text"
          onClick={() => setIsEditing(true)}
        >
          edit
        </p>
      </h2>

      <div className="profile-settings__setting-wrapper">
        <label className="profile-settings__setting-label">USERNAME</label>
        {isEditing ? (
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
        {isEditing ? (
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
        {isEditing ? (
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

      {isEditing ? (
        <div className="account-settings__button-wrapper">
          <Button
            text="Cancel"
            color="white"
            addStyles="account-settings__cancel-button"
            onClick={() => {
              // reset values rendered during edit mode to those found in profileData
              setNewUsername(profileData.user_name);
              setNewLocation(profileData.user_location);
              setNewBio(profileData.user_bio);
              setIsEditing(false);
            }}
          />
          <Button
            text="Save"
            color="orange"
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
