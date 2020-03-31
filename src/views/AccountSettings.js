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
import DataSettings from "../user/components/DataSettings";
import SecuritySettings from "../user/components/SecuritySettings";
import Spinner from "../app/components/Spinner";
import Button from "../app/components/Button";
import { checkAuthExpiry } from "../auth/auth-helpers";

function UserSettings({ history }) {
  const profileDispatch = useProfileDispatch();
  const { profileData } = useProfileState();

  const { userAddress, authExpiry } = useAuthState();
  // Profile settings
  const [newUsername, setNewUsername] = useState("");
  const [newEmail, setNewEmail] = useState("");
  const [newLocation, setNewLocation] = useState("");
  const [newBio, setNewBio] = useState("");

  const [isLoading, setIsLoading] = useState(false);
  const [fetchProfileErrorMessage, setFetchProfileErrorMessage] = useState("");
  const [editProfileErrorMessage, setEditProfileErrorMessage] = useState("");

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
      setFetchProfileErrorMessage("");
      setIsLoading(true);
      // checks if auth is valid and hasn't expired
      checkAuthExpiry(authExpiry);

      try {
        const result = await axiosWithCache.get(
          `${API_ROOT}/profile?address=${userAddress}`
        );

        profileDispatch({ type: "SET_PROFILE_DATA", payload: result.data });
      } catch (error) {
        setFetchProfileErrorMessage(error.response.data);
      }
      setIsLoading(false);
    };

    if (userAddress !== "none" && userAddress) {
      doFetch();
    }
  }, [userAddress, authExpiry, profileDispatch]);

  const submitEdit = async () => {
    setEditProfileErrorMessage("");
    setIsLoading(true);
    // checks if auth is valid and hasn't expired
    checkAuthExpiry(authExpiry);
    // Post the edits
    try {
      await axios.post(
        `${API_ROOT}/editProfile`,
        JSON.stringify({
          address: userAddress,
          username: newUsername,
          email: newEmail,
          bio: newBio,
          location: newLocation,
          new_station_names: newStationNames,
          new_station_notes: newStationNotes,
          deleted_stations: deletedStations
        }),
        {
          withCredentials: true,
          headers: {
            "Content-Type": "application/json"
          }
        }
      );
      // refresh the page to pull the latest data just posted
      window.location.reload();
    } catch (error) {
      setEditProfileErrorMessage(error.response.data);
    }
  };

  const logout = () => {
    localStorage.removeItem("trusat-login-credentials");
    localStorage.removeItem("trusat-allow-cookies");
    history.push("/");
    window.location.reload();
  };

  return fetchProfileErrorMessage ? (
    <p className="app__error-message">
      Something went wrong... {fetchProfileErrorMessage}
    </p>
  ) : isLoading ? (
    <Spinner />
  ) : userAddress === "none" ? (
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

      {editProfileErrorMessage ? (
        <p className="app__error-message">
          Something went wrong... {editProfileErrorMessage}
        </p>
      ) : null}

      <DataSettings />

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
