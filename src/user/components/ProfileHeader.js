import React from "react";
import { NavLink } from "react-router-dom";
import Blockie from "react-blockies";
import { useUserState } from "../user-context";
import { shortenAddress } from "../../app/helpers";

export default function ProfileHeader() {
  const { userData } = useUserState();

  return (
    <section className="profile__header-wrapper">
      <div className="profile__blockie-name-wrapper">
        <Blockie
          seed={userData.user_address}
          size={30}
          scale={3}
          className="blockie"
        />
        <h1 className="profile__header-username">
          {userData.user_name
            ? userData.user_name
            : shortenAddress(userData.user_address)}
        </h1>
      </div>

      <div className="profile__button-data-wrapper">
        <NavLink className="app__nav-link" to="/settings">
          <span className="app__black-button--small">Settings</span>
        </NavLink>
        <div className="profile__header-data-wrapper">
          <div className="profile__header-info-data-label">
            {userData.user_location ? (
              <p className="profile__header-info-data-value">
                {userData.user_location}
              </p>
            ) : (
              <p className="profile__header-info-data-value">
                Location Undisclosed
              </p>
            )}
          </div>

          <div className="profile__header-info-data-label">
            {userData.number_objects_tracked ? (
              <p className="profile__header-info-data-value">
                {userData.number_objects_tracked}
              </p>
            ) : (
              <p className="profile__header-info-data-value">?</p>
            )}
            &nbsp; OBJECTS TRACKED
          </div>

          <div className="profile__header-info-data-label">
            {userData.observation_count ? (
              <p className="profile__header-info-data-value">
                {userData.observation_count}
              </p>
            ) : (
              <p className="profile__header-info-data-value">?</p>
            )}
            &nbsp; OBSERVATIONS
          </div>

          {userData.observation_count !== "0" ? (
            <div className="profile__header-info-data-label">
              {userData.user_first_observation ? (
                <p className="profile__header-info-data-value">
                  {userData.user_first_observation}
                </p>
              ) : (
                <p className="profile__header-info-data-value">?</p>
              )}
              &nbsp; <p>1ST OBSERVATION</p>
            </div>
          ) : null}

          {userData.observation_count !== "0" ? (
            <div className="profile__header-info-data-label">
              {userData.average_observation_quality ? (
                <p className="profile__header-info-data-value">
                  {userData.average_observation_quality}
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
        {userData.user_bio ? userData.user_bio : null}
      </p>
    </section>
  );
}
