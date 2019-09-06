import React, { useState } from "react";
import axios from "axios";
import { useAuthState } from "../auth/auth-context";
import ProfileSettings from "../user/components/ProfileSettings";
import PrivacySettings from "../user/components/PrivacySettings";
import SecuritySettings from "../user/components/SecuritySettings";
import { useUserState } from "../user/user-context";

export default function UserSettings() {
  const { jwt, address } = useAuthState();
  const [showEditInputs, setShowEditInputs] = useState(false);
  const [newUsername, setNewUsername] = useState("");
  const [newEmail, setNewEmail] = useState("");
  const [newLocation, setNewLocation] = useState("");
  const [newBio, setNewBio] = useState("");

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
          location: newLocation
        })
      )
      .then(result => {
        console.log(result);
      })
      .catch(err => console.log(err));
  };

  return (
    <div className="account-settings__wrapper">
      <h1 className="account-settings__header">ACCOUNT SETTINGS</h1>
      <ProfileSettings
        newUsername={newUsername}
        setNewUsername={setNewUsername}
        newEmail={newEmail}
        setNewEmail={setNewEmail}
        newLocation={newLocation}
        setNewLocation={setNewLocation}
        newBio={newBio}
        setNewBio={setNewBio}
        showEditInputs={showEditInputs}
        setShowEditInputs={setShowEditInputs}
      />
      <PrivacySettings />

      {showEditInputs ? (
        <div className="account-settings__button-wrapper">
          <span
            className="app__black-button--small"
            onClick={() => setShowEditInputs(false)}
          >
            Cancel
          </span>
          <span className="app__black-button--small" onClick={() => submitEdit}>
            Save
          </span>
        </div>
      ) : null}

      <SecuritySettings />
    </div>
  );
}
