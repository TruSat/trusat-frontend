import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import axios from "axios";
import { useAuthState } from "../auth/auth-context";
import EditSettingInput from "./EditSettingInput";
import EditPrivacyInput from "./EditPrivacyInput";
import SecuritySettings from "./SecuritySettings";

export default function AccountDetails() {
  const { isAuth, authType, jwt, address } = useAuthState();
  const [showEditInputs, setShowEditInputs] = useState(false);
  const [username, setUsername] = useState("Leo Barhorst");
  const [email, setEmail] = useState("leo@gmail.com");
  const [bio, setBio] = useState("I'm amazing");
  const [location, setLocation] = useState("holland");

  const publicProfile = true;

  const submitEdit = () => {
    axios
      .post(
        `https://api.consensys.space:8080/editProfile`,
        JSON.stringify({
          jwt: jwt,
          address: address,
          username: username,
          email: email,
          bio: bio,
          location: location
        })
      )
      .then(result => {
        console.log(result);
      })
      .catch(err => console.log(err));
  };

  const signOut = () => {
    localStorage.removeItem("trusat-jwt");
    localStorage.removeItem("trusat-address");
    localStorage.removeItem("trusat-private-key");
    window.location.reload();
  };

  return isAuth ? (
    <section className="profile-settings__wrapper">
      <div className="profile-settings__profile-wrapper">
        <h2 className="profile-settings__sub-header">
          <p>PROFILE</p>
          <p
            className="profile-settings__edit-button-text"
            onClick={() => setShowEditInputs(true)}
          >
            edit
          </p>
        </h2>

        <div className="profile-settings__setting-wrapper">
          <label className="profile-settings__setting-label">USERNAME</label>
          {showEditInputs ? (
            <EditSettingInput setting={username} setSetting={setUsername} />
          ) : (
            <p>{username}</p>
          )}
        </div>

        <div className="profile-settings__setting-wrapper">
          <label className="profile-settings__setting-label">ETH ADDRESS</label>
          <p>{address}</p>
        </div>

        <div className="profile-settings__setting-wrapper">
          <label className="profile-settings__setting-label">EMAIL</label>
          {showEditInputs ? (
            <EditSettingInput setting={email} setSetting={setEmail} />
          ) : (
            <p>{email}</p>
          )}
        </div>

        <div className="profile-settings__setting-wrapper">
          <label className="profile-settings__setting-label">LOCATION</label>
          {showEditInputs ? (
            <EditSettingInput setting={location} setSetting={setLocation} />
          ) : (
            <p>{location}</p>
          )}
        </div>

        <div className="profile-settings__setting-wrapper">
          <label className="profile-settings__setting-label">BIO</label>
          {showEditInputs ? (
            <EditSettingInput setting={bio} setSetting={setBio} />
          ) : (
            <p>{bio}</p>
          )}
        </div>
      </div>

      <div className="profile-settings__observation-wrapper">
        <h2 className="profile-settings__sub-header">OBSERVATION STATIONS</h2>
      </div>
    </section>
  ) : null;
}

{
  /* <section
          style={{
            alignItems: "center",
            display: "flex",
            flexDirection: "column",
            border: "1px solid white",
            margin: "1em"
          }}
        >
          Got more than one station?
          <a href="help@trusat.net">Email us</a> and we'll combine into one
          account
          <button onClick={signOut}>Sign out</button>
        </section> */
}
