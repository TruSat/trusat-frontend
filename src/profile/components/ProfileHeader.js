import React from "react";
import { NavLink } from "react-router-dom";
import Blockie from "react-blockies";
import { useAuthState } from "../../auth/auth-context";
import { useProfileState } from "../profile-context";
import { shortenAddressToolTip, toolTip } from "../../app/app-helpers";

export default function ProfileHeader() {
  const { userAddress } = useAuthState();
  const { profileData } = useProfileState();

  return profileData.user_address ? (
    <section className="profile__header-wrapper">
      <div className="profile__blockie-name-wrapper">
        <Blockie
          seed={profileData.user_address}
          size={30}
          scale={3}
          className="blockie"
        />
        <h1 className="profile__header-username">
          {profileData.user_name
            ? toolTip(profileData.user_name, profileData.user_address)
            : shortenAddressToolTip(profileData.user_address)}
        </h1>

        {/* Dont render settings link to user unless they are viewing their own profile */}
        {userAddress.toLowerCase() ===
        profileData.user_address.toLowerCase() ? (
          <div className="profile__header-settings-link-wrapper">
            <NavLink className="app__nav-link" to="/submit">
              <span className="catalog__button catalog__get-data-button">
                Submit observations
              </span>
            </NavLink>
            <NavLink className="app__nav-link" to="/settings">
              <span className="profile__header-settings-link">Settings</span>
            </NavLink>
          </div>
        ) : null}
      </div>

      <div className="profile__button-data-wrapper">
        <div className="profile__header-data-wrapper">
          <div className="profile__header-info-data-label">
            <p className="profile__header-info-data-value profile__header-info-data-value--lowlight">
              {profileData.user_location
                ? profileData.user_location
                : `Location Undisclosed`}
            </p>
          </div>

          <div className="profile__header-info-data-label">
            <p className="profile__header-info-data-value">
              {profileData.number_objects_tracked
                ? profileData.number_objects_tracked
                : 0}
            </p>
            &nbsp; OBJECTS TRACKED
          </div>

          <div className="profile__header-info-data-label">
            <p className="profile__header-info-data-value">
              {profileData.observation_count
                ? profileData.observation_count
                : 0}
            </p>
            &nbsp; OBSERVATIONS
          </div>

          {profileData.observation_count !== "0" ? (
            <div className="profile__header-info-data-label">
              <p className="profile__header-info-data-value">
                {profileData.user_first_observation
                  ? profileData.user_first_observation
                  : `?`}
              </p>
              &nbsp; <p>1ST OBSERVATION</p>
            </div>
          ) : null}

          {profileData.observation_count !== "0" ? (
            <div className="profile__header-info-data-label">
              <p className="profile__header-info-data-value">
                {/* {profileData.average_observation_quality
                  ? profileData.average_observation_quality
                  : `?`} */}
                TBD
              </p>
              &nbsp; <p>AVG. ACCURACY</p>
            </div>
          ) : null}
        </div>
      </div>
      <p className="profile__bio-text">
        {profileData.user_bio ? profileData.user_bio : null}
      </p>
    </section>
  ) : null;
}
