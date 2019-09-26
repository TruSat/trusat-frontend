import React from "react";
import { useAuthState } from "../../auth/auth-context";
import { useProfileState } from "../../profile/profile-context";
import EditProfileSettingInput from "./EditProfileSettingInput";
import CopyText from "../../app/components/CopyText";
import { shortenAddressToolTip } from "../../app/helpers";

// TODO make the profile info from API call on /profile available and rendered here
export default function ProfileSettings({
  newUsername,
  setNewUsername,
  newEmail,
  setNewEmail,
  newBio,
  setNewBio,
  newLocation,
  setNewLocation,
  showEditProfileInputs,
  setShowEditProfileInputs
}) {
  const { userAddress } = useAuthState();
  const { profileData } = useProfileState();

  return (
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
            <p>{profileData.user_name}</p>
          )}
        </div>

        <div className="profile-settings__setting-wrapper">
          <label className="profile-settings__setting-label">ETH ADDRESS</label>
          <p>{shortenAddressToolTip(userAddress)}</p>
          <CopyText textToCopy={userAddress} />
        </div>

        <div className="profile-settings__setting-wrapper">
          <label className="profile-settings__setting-label">EMAIL</label>
          {showEditProfileInputs ? (
            <EditProfileSettingInput
              setting={newEmail}
              setSetting={setNewEmail}
            />
          ) : (
            <p>{profileData.email ? profileData.email : "none"}</p>
          )}
        </div>

        <div className="profile-settings__setting-wrapper">
          <label className="profile-settings__setting-label">LOCATION</label>
          {showEditProfileInputs ? (
            <EditProfileSettingInput
              setting={newLocation}
              setSetting={setNewLocation}
            />
          ) : (
            <p>
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
              maxlength="160"
              value={newBio}
              onChange={event => setNewBio(event.target.value)}
            ></textarea>
          ) : (
            <p>{profileData.user_bio}</p>
          )}
        </div>
      </div>

      <div className="profile-settings__observation-wrapper">
        <h2 className="profile-settings__heading">OBSERVATION STATIONS</h2>
      </div>
    </section>
  );
}
