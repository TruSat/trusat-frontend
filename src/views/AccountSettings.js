import React, { useState, useEffect } from "react";
import { withRouter, NavLink } from "react-router-dom";
import axios from "axios";
import { API_ROOT, axiosWithCache } from "../app/app-helpers";
import {
  useProfileState,
  useProfileDispatch
} from "../profile/profile-context";
import { useAuthState } from "../auth/auth-context";
import ProfileSettings from "../user/components/ProfileSettings";
import SavedLocations from "../user/components/SavedLocations";
import PrivacySettings from "../user/components/PrivacySettings";
import SecuritySettings from "../user/components/SecuritySettings";
import Spinner from "../app/components/Spinner";
import Button from "../app/components/Button";
import { checkJwt } from "../auth/auth-helpers";

function UserSettings({ history }) {
  const profileDispatch = useProfileDispatch();
  const { profileData } = useProfileState();

  const { jwt, userAddress } = useAuthState();
  // Profile settings
  const [newUsername, setNewUsername] = useState("");
  const [newEmail, setNewEmail] = useState("");
  const [newLocation, setNewLocation] = useState("");
  const [newBio, setNewBio] = useState("");

  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);

  const [newStationData, setNewStationData] = useState([]);
  const [newStationNames, setNewStationNames] = useState({});
  const [newStationNotes, setNewStationNotes] = useState({});
  const [deletedStations, setDeletedStations] = useState([]);

  useEffect(() => {
    const {
      user_name,
      email,
      user_location,
      user_bio,
      observation_stations
    } = profileData;
    // Add the current values so that they appear in input fields when user is editing
    setNewUsername(user_name);
    setNewEmail(email);
    setNewLocation(user_location);
    setNewBio(user_bio);
    setNewStationData(observation_stations); // used to render the saved locations table in edit mode
  }, [profileData]);

  useEffect(() => {
    const doFetch = async () => {
      setIsError(false);
      setIsLoading(true);
      // checks if jwt is valid and hasn't expired
      checkJwt(jwt);

      try {
        const result = await axiosWithCache.get(
          `${API_ROOT}/profile?address=${userAddress}&jwt=${jwt}`
        );

        profileDispatch({ type: "SET_PROFILE_DATA", payload: result.data });
      } catch (error) {
        setIsError(true);
        console.log(error);
      }
      setIsLoading(false);
    };

    if (jwt !== "none" && userAddress) {
      doFetch();
    }
  }, [jwt, userAddress, profileDispatch]);

  const submitEdit = async () => {
    setIsError(false);
    setIsLoading(true);
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
          location: newLocation,
          new_station_names: newStationNames,
          new_station_notes: newStationNotes,
          deleted_stations: deletedStations
        })
      );
      // refresh the page to pull the latest data just posted
      window.location.reload();
    } catch (error) {
      setIsError(true);
    }
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
  ) : jwt === "none" ? (
    <div className="app__error-message">
      You need to login{" "}
      <NavLink className="app__nav-link app__link" to="/login">
        here
      </NavLink>{" "}
      to view your settings page
    </div>
  ) : (
    <div className="account-settings__wrapper">
      <h1 className="account-settings__header">Account Settings</h1>
      <section className="profile-settings__wrapper">
        <ProfileSettings
          newUsername={newUsername}
          setNewUsername={setNewUsername}
          newEmail={newEmail}
          newLocation={newLocation}
          setNewLocation={setNewLocation}
          newBio={newBio}
          setNewBio={setNewBio}
          submitEdit={submitEdit}
        />

        <SavedLocations
          newStationData={newStationData}
          setNewStationData={setNewStationData}
          newStationNames={newStationNames}
          setNewStationNames={setNewStationNames}
          newStationNotes={newStationNotes}
          setNewStationNotes={setNewStationNotes}
          deletedStations={deletedStations}
          setDeletedStations={setDeletedStations}
          submitEdit={submitEdit}
        />
      </section>

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
