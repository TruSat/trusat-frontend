import React from "react";
import { useUserState } from "../../user/user-context";
import EditProfileSettingInput from "./EditProfileSettingInput";

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
  const { userData } = useUserState();

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
            <p>{userData.user_name}</p>
          )}
        </div>

        <div className="profile-settings__setting-wrapper">
          <label className="profile-settings__setting-label">ETH ADDRESS</label>
          <p>{userData.user_address}</p>
        </div>

        <div className="profile-settings__setting-wrapper">
          <label className="profile-settings__setting-label">EMAIL</label>
          {showEditProfileInputs ? (
            <EditProfileSettingInput
              setting={newEmail}
              setSetting={setNewEmail}
            />
          ) : (
            <p>{userData.email}</p>
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
            <p>{userData.user_location}</p>
          )}
        </div>

        <div className="profile-settings__setting-wrapper">
          <label className="profile-settings__setting-label">BIO</label>
          {showEditProfileInputs ? (
            <EditProfileSettingInput setting={newBio} setSetting={setNewBio} />
          ) : (
            <p>{userData.user_bio}</p>
          )}
        </div>
      </div>

      <div className="profile-settings__observation-wrapper">
        <h2 className="profile-settings__heading">OBSERVATION STATIONS</h2>
      </div>
    </section>
  );
}
