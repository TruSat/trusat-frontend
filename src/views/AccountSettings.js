import React, { useState, useEffect } from "react";
import axios from "axios";
import { useAuthState } from "../auth/auth-context";
import ProfileSettings from "../user/components/ProfileSettings";
import PrivacySettings from "../user/components/PrivacySettings";
import SecuritySettings from "../user/components/SecuritySettings";
import Spinner from "../app/components/Spinner";
import { useUserState } from "../user/user-context";

export default function UserSettings() {
  const { jwt, address } = useAuthState();
  const { userData, showUserProfile } = useUserState();
  // profile settings
  const [showEditProfileInputs, setShowEditProfileInputs] = useState(false);
  const [newUsername, setNewUsername] = useState("");
  const [newEmail, setNewEmail] = useState("");
  const [newLocation, setNewLocation] = useState("");
  const [newBio, setNewBio] = useState("");
  //privacy settings
  const [showEditPrivacyInputs, setShowEditPrivacyInputs] = useState(false);
  const [newPublicUsername, setNewPublicUsername] = useState(false);
  const [newPublicLocation, setNewPublicLocation] = useState(false);

  console.log(userData);

  useEffect(() => {
    const {
      user_name,
      email,
      user_location,
      user_bio,
      public_username,
      public_location
    } = userData;

    setNewUsername(user_name);
    setNewEmail(email);
    setNewLocation(user_location);
    setNewLocation(user_bio);
    // setNewPublicUsername(public_username);
    // setNewPublicLocation(public_location)
  }, [userData]);

  const submitEdit = () => {
    axios
      .post(
        `https://api.consensys.space:8080/editProfile`,
        JSON.stringify({
          jwt: jwt,
          address: address,
          username: newUsername,
          email: newEmail,
          bio: newBio,
          location: newLocation,
          publicUsername: newPublicUsername,
          publicLocation: newPublicLocation
        })
      )
      .then(result => {
        console.log(result);
      })
      .catch(err => console.log(err));
  };

  return showUserProfile ? (
    <div className="account-settings__wrapper">
      <h1 className="account-settings__header">ACCOUNT SETTINGS</h1>
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
      <PrivacySettings
        showEditPrivacyInputs={showEditPrivacyInputs}
        setShowEditPrivacyInputs={setShowEditPrivacyInputs}
        newPublicUsername={newPublicUsername}
        setNewPublicUsername={setNewPublicUsername}
        newPublicLocation={newPublicLocation}
        setNewPublicLocation={setNewPublicLocation}
      />

      {showEditProfileInputs === true || showEditPrivacyInputs === true ? (
        <div className="account-settings__button-wrapper">
          <span
            className="app__white-button--small account-settings__cancel-button"
            onClick={() => {
              setShowEditProfileInputs(false);
              setShowEditPrivacyInputs(false);
            }}
          >
            Cancel
          </span>
          <span
            className="app__black-button--small"
            onClick={() => {
              submitEdit();
              setShowEditProfileInputs(false);
              setShowEditPrivacyInputs(false);
            }}
          >
            Save
          </span>
        </div>
      ) : null}

      <SecuritySettings />
    </div>
  ) : (
    <Spinner />
  );
}
