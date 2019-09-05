import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import axios from "axios";
import { useAuthState } from "../auth/auth-context";
import EditSettingInput from "./EditSettingInput";
import EditPrivacyInput from "./EditPrivacyInput";
import SecuritySettings from "./SecuritySettings";

export default function AccountDetails() {
  const { isAuth, authType, jwt, address } = useAuthState();
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [bio, setBio] = useState("");
  const [location, setLocation] = useState("");
  const [publicUsername, setPublicUsername] = useState(false);
  const [publicLocation, setPublicLocation] = useState(false);

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
          location: location,
          public_username: publicUsername,
          public_location: publicLocation
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
        <h2 className="profile-settings__sub-header">PROFILE</h2>

        <div style={{ margin: "1em" }}>
          Username{" "}
          <EditSettingInput
            setting={username}
            setSetting={setUsername}
            submitEdit={submitEdit}
          />
        </div>

        <div>
          ETH address
          <p>{address}</p>
        </div>

        <div style={{ margin: "1em" }}>
          Email{" "}
          <EditSettingInput
            setting={email}
            setSetting={setEmail}
            submitEdit={submitEdit}
          />
        </div>

        <div style={{ margin: "1em" }}>
          Location{" "}
          <EditSettingInput
            setting={location}
            setSetting={setLocation}
            submitEdit={submitEdit}
          />
        </div>

        <div style={{ margin: "1em" }}>
          Bio{" "}
          <EditSettingInput
            setting={bio}
            setSetting={setBio}
            submitEdit={submitEdit}
          />
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
