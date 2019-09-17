import React, { useState, useEffect } from "react";
import axios from "axios";
import { useAuthState } from "../auth/auth-context";
import ProfileSettings from "../user/components/ProfileSettings";
import PrivacySettings from "../user/components/PrivacySettings";
import SecuritySettings from "../user/components/SecuritySettings";
import { useUserDispatch, useUserState } from "../user/user-context";
import Spinner from "../app/components/Spinner";

export default function UserSettings() {
  const userDispatch = useUserDispatch();
  const { jwt, authType } = useAuthState();
  const { userAddress, userData } = useUserState();
  const [isLoading, setIsLoading] = useState(false);
  // Profile settings
  const [showEditProfileInputs, setShowEditProfileInputs] = useState(false);
  const [newUsername, setNewUsername] = useState("");
  const [newEmail, setNewEmail] = useState("");
  const [newLocation, setNewLocation] = useState("");
  const [newBio, setNewBio] = useState("");
  // Privacy settings
  const [showEditPrivacyInputs, setShowEditPrivacyInputs] = useState(false);
  const [newPublicUsername, setNewPublicUsername] = useState(true);
  const [newPublicLocation, setNewPublicLocation] = useState(false);
  const [newPublicObservations, setNewPublicObservations] = useState(true);

  useEffect(() => {
    console.log(userData);

    setIsLoading(true);

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
    setNewBio(user_bio);
    setNewPublicUsername(public_username);
    setNewPublicLocation(public_location);

    setIsLoading(false);
  }, [userData]);

  const submitEdit = async () => {
    setIsLoading(true);
    // Post the edits
    await axios
      .post(
        `https://api.consensys.space:8080/editProfile`,
        JSON.stringify({
          jwt: jwt,
          address: userAddress,
          username: newUsername,
          email: newEmail,
          bio: newBio,
          location: newLocation,
          public_username: newPublicUsername,
          public_location: newPublicLocation,
          public_observations: newPublicObservations
        })
      )
      .then(result => {
        console.log(result);
      })
      .catch(err => console.log(err));
    // Get the updated user data
    await axios
      .post(
        `https://api.consensys.space:8080/profile`,
        JSON.stringify({
          jwt: jwt,
          address: userAddress
        })
      )
      .then(result => {
        userDispatch({ type: "SET_USER_DATA", payload: result.data });
        setIsLoading(false);
      })
      .catch(err => console.log(err));
  };

  return isLoading ? (
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
      <PrivacySettings
        showEditPrivacyInputs={showEditPrivacyInputs}
        setShowEditPrivacyInputs={setShowEditPrivacyInputs}
        newPublicUsername={newPublicUsername}
        setNewPublicUsername={setNewPublicUsername}
        newPublicLocation={newPublicLocation}
        setNewPublicLocation={setNewPublicLocation}
        newPublicObservations={newPublicObservations}
        setNewPublicObservations={setNewPublicObservations}
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

      {/* Only show prompt to make move to metamask if they haven't already done so */}
      {authType === "metamask" ? null : <SecuritySettings />}
    </div>
  );
}
