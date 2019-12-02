import React, { useState, useEffect } from "react";
import { withRouter } from "react-router-dom";
import axios from "axios";
import { API_ROOT } from "../app/app-helpers";
import { useProfileState } from "../profile/profile-context";
import { useAuthState } from "../auth/auth-context";
import ProfileSettings from "../user/components/ProfileSettings";
import PrivacySettings from "../user/components/PrivacySettings";
import SecuritySettings from "../user/components/SecuritySettings";
import Spinner from "../app/components/Spinner";
import Button from "../app/components/Button";
import { checkJwt } from "../auth/auth-helpers";

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

  useEffect(() => {
    const { user_name, email, user_location, user_bio } = profileData;
    // Add the current values so that they appear in input fields when user is editing
    setNewUsername(user_name);
    setNewEmail(email);
    setNewLocation(user_location);
    setNewBio(user_bio);
  }, [profileData]);

  const submitEdit = async () => {
    setIsError(false);
    setIsloading(true);
    // checks if jwt is valid and hasn't expired
    checkJwt(jwt);
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
        })
      );
    } catch (error) {
      setIsError(true);
    }
    // After edit, kick user back to their profile and refresh browser to show changes
    history.push(`/profile/${userAddress}`);
    window.location.reload();
  };

  const logout = () => {
    localStorage.removeItem("trusat-jwt");
    localStorage.removeItem("trusat-allow-cookies");
    history.push(`/`);
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
        newLocation={newLocation}
        setNewLocation={setNewLocation}
        newBio={newBio}
        setNewBio={setNewBio}
      />
      {showEditProfileInputs ? (
        <div className="account-settings__button-wrapper">
          <Button
            text="Cancel"
            color="white"
            addStyles="account-settings__cancel-button"
            onClick={() => {
              setShowEditProfileInputs(false);
            }}
          />
          <Button
            text="Save"
            color="orange"
            onClick={() => {
              submitEdit();
              setShowEditProfileInputs(false);
            }}
          />
        </div>
      ) : null}

      <PrivacySettings />

      {/* Only show prompt to make move to metamask if they dont have plugin installed */}
      {window.etherem ? null : <SecuritySettings />}
      <Button
        color="white"
        text="logout"
        addStyles="account-settings__log-out-button"
        onClick={logout}
      ></Button>
    </div>
  );
}

export default withRouter(UserSettings);
