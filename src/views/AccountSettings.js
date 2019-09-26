import React, { useState, useEffect } from "react";
import { withRouter } from "react-router-dom";
import axios from "axios";
import { API_ROOT } from "../app/helpers";
import { useProfileState } from "../profile/profile-context";
import { useAuthState } from "../auth/auth-context";
import ProfileSettings from "../user/components/ProfileSettings";
import PrivacySettings from "../user/components/PrivacySettings";
import SecuritySettings from "../user/components/SecuritySettings";
import Spinner from "../app/components/Spinner";

function UserSettings({ history }) {
  const { profileData } = useProfileState();
  const { jwt, userAddress } = useAuthState();
  // Profile settings
  const [showEditProfileInputs, setShowEditProfileInputs] = useState(false);
  const [newUsername, setNewUsername] = useState("");
  const [newEmail, setNewEmail] = useState("");
  const [newLocation, setNewLocation] = useState("");
  const [newBio, setNewBio] = useState("");

  const [isLoading, setIsloading] = useState(false);
  const [isError, setIsError] = useState(false);
  // Privacy settings
  // const [showEditPrivacyInputs, setShowEditPrivacyInputs] = useState(false);
  // const [newPublicUsername, setNewPublicUsername] = useState(true);
  // const [newPublicLocation, setNewPublicLocation] = useState(false);
  // const [newPublicObservations, setNewPublicObservations] = useState(true);

  useEffect(() => {
    const {
      user_name,
      email,
      user_location,
      user_bio
      // public_username,
      // public_location,
      // public_observations
    } = profileData;

    setNewUsername(user_name);
    setNewEmail(email);
    setNewLocation(user_location);
    setNewBio(user_bio);
    // setNewPublicUsername(public_username);
    // setNewPublicLocation(public_location);
    // setNewPublicObservations(public_observations);
  }, [profileData]);

  const submitEdit = async () => {
    setIsError(false);
    setIsloading(true);
    // Post the edits
    try {
      await axios.post(
        `${API_ROOT}/editProfile`,
        JSON.stringify({
          jwt: jwt,
          address: userAddress,
          username: newUsername,
          email: newEmail,
          bio: newBio,
          location: newLocation
          // public_username: newPublicUsername,
          // public_location: newPublicLocation,
          // public_observations: newPublicObservations
        })
      );
    } catch (error) {
      setIsError(true);
    }

    history.push(`/profile/${userAddress}`);
    window.location.reload();
  };

  return isError ? (
    <p className="app__error-message">Something went wrong...</p>
  ) : isLoading ? (
    <Spinner />
  ) : (
    <div className="account-settings__wrapper">
      <h1 className="account-settings__header">Account Settings</h1>
      <ProfileSettings
        showEditProfileInputs={showEditProfileInputs}
        setShowEditProfileInputs={setShowEditProfileInputs}
        newUsername={newUsername}
        setNewUsername={setNewUsername}
        newEmail={newEmail}
        setNewEmail={setNewEmail}
        newLocation={newLocation}
        setNewLocation={setNewLocation}
        newBio={newBio}
        setNewBio={setNewBio}
      />
      {showEditProfileInputs === true ? (
        <div className="account-settings__button-wrapper">
          <span
            className="app__white-button--small account-settings__cancel-button"
            onClick={() => {
              setShowEditProfileInputs(false);
              // setShowEditPrivacyInputs(false);
            }}
          >
            Cancel
          </span>
          <span
            className="app__black-button--small"
            onClick={() => {
              submitEdit();
              setShowEditProfileInputs(false);
              // setShowEditPrivacyInputs(false);
            }}
          >
            Save
          </span>
        </div>
      ) : null}
      <PrivacySettings
      // showEditPrivacyInputs={showEditPrivacyInputs}
      // setShowEditPrivacyInputs={setShowEditPrivacyInputs}
      // newPublicUsername={newPublicUsername}
      // setNewPublicUsername={setNewPublicUsername}
      // newPublicLocation={newPublicLocation}
      // setNewPublicLocation={setNewPublicLocation}
      // newPublicObservations={newPublicObservations}
      // setNewPublicObservations={setNewPublicObservations}
      />

      {/* Only show prompt to make move to metamask if they dont have plugin installed */}
      {window.etherem ? null : <SecuritySettings />}
    </div>
  );
}

export default withRouter(UserSettings);
