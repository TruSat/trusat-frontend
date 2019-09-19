import React from "react";
import { NavLink } from "react-router-dom";
import Blockie from "react-blockies";
import { useAuthState } from "../../auth/auth-context";
import { useProfileState } from "../profile-context";
import { shortenAddressToolTip, toolTip } from "../../app/helpers";

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
      </div>

      <div className="profile__button-data-wrapper">
        {/* Dont render settings link to user unless they are viewing their own profile */}
        {userAddress === profileData.user_address ? (
          <NavLink className="app__nav-link" to="/settings">
            <span className="app__black-button--small">Settings</span>
          </NavLink>
        ) : null}

        <div className="profile__header-data-wrapper">
          <div className="profile__header-info-data-label">
            {profileData.user_location ? (
              <p className="profile__header-info-data-value">
                {profileData.user_location}
              </p>
            ) : (
              <p className="profile__header-info-data-value">
                Location Undisclosed
              </p>
            )}
          </div>

          <div className="profile__header-info-data-label">
            {profileData.number_objects_tracked ? (
              <p className="profile__header-info-data-value">
                {profileData.number_objects_tracked}
              </p>
            ) : (
              <p className="profile__header-info-data-value">?</p>
            )}
            &nbsp; OBJECTS TRACKED
          </div>

          <div className="profile__header-info-data-label">
            {profileData.observation_count ? (
              <p className="profile__header-info-data-value">
                {profileData.observation_count}
              </p>
            ) : (
              <p className="profile__header-info-data-value">?</p>
            )}
            &nbsp; OBSERVATIONS
          </div>

          {profileData.observation_count !== "0" ? (
            <div className="profile__header-info-data-label">
              {profileData.user_first_observation ? (
                <p className="profile__header-info-data-value">
                  {profileData.user_first_observation}
                </p>
              ) : (
                <p className="profile__header-info-data-value">?</p>
              )}
              &nbsp; <p>1ST OBSERVATION</p>
            </div>
          ) : null}

          {profileData.observation_count !== "0" ? (
            <div className="profile__header-info-data-label">
              {profileData.average_observation_quality ? (
                <p className="profile__header-info-data-value">
                  {profileData.average_observation_quality}
                </p>
              ) : (
                <p className="profile__header-info-data-value">?</p>
              )}
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
