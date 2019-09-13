import React from "react";
import { NavLink } from "react-router-dom";
import Blockie from "react-blockies";
import ObjectBadge from "../assets/ObjectBadge.svg";
import Spinner from "../app/components/Spinner";
import { renderFlag } from "../app/helpers";
import { useUserState } from "../user/user-context";
import { shortenAddress } from "../app/helpers";

export default function Profile() {
  // TODO - add if statement to use address found in auth state before using the match address
  const { userData, showUserProfile } = useUserState();
  console.log(userData);

  const renderObjectsCollectedRows = () => {
    return userData.objects_observed.map(obj => (
      <tr
        key={userData.observation_history.indexOf(obj)}
        className="table__body-row profile-table__body-row"
      >
        <td className="table__table-data">
          <NavLink
            key={userData.objects_observed.indexOf(obj)}
            className="app__nav-link"
            to={`/object/${obj.object_norad_number}`}
          >
            <div className="profile-table__data-wrapper">
              <img src={ObjectBadge} alt="Object Badge"></img>
              &nbsp;
              <p>{obj.object_name}</p>
            </div>
          </NavLink>
        </td>
        <td className="table__table-data">{renderFlag(obj.object_origin)}</td>
        <td className="table__table-data app__hide-on-mobile">
          {obj.object_primary_purpose ? (
            <p>
              {obj.object_primary_purpose}&nbsp;
              {obj.object_secondary_purpose}
            </p>
          ) : (
            <p>purpose unknown</p>
          )}
        </td>
        <td className="table__table-data app__hide-on-mobile">
          {obj.observation_quality}
        </td>
        <td className="table__table-data">
          {obj.username_last_tracked
            ? obj.username_last_tracked
            : shortenAddress(obj.address_last_tracked)}
        </td>
      </tr>
    ));
  };

  const renderYourObservationsRows = () => {
    return userData.observation_history.map(observation => (
      <tr
        key={userData.observation_history.indexOf(observation)}
        className="table__body-row"
      >
        <td className="table__table-data">{observation.observation_time}</td>
        <td className="table__table-data">{observation.object_name}</td>
        <td className="table__table-data">{observation.observation_quality}</td>
        <td className="table__table-data">
          {observation.observation_time_difference.substring(0, 4)}
        </td>
        <td className="table__table-data">
          {observation.observation_weight.substring(0, 4)}
        </td>
      </tr>
    ));
  };

  return showUserProfile ? (
    <div className="profile__wrapper">
      <section className="profile__header-wrapper">
        <div className="profile__blockie-name-wrapper">
          <Blockie
            seed={userData.user_address}
            size={30}
            scale={3}
            className="blockie"
            // color="#dfe"
            // bgColor="#ffe"
            // spotColor="#abc"
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

      <section className="profile__objects-tracked-wrapper">
        <h2 className="profile__sub-heading">OBJECTS COLLECTED</h2>
        {userData.objects_observed.length !== 0 ? (
          <table className="table">
            <thead className="table__header">
              <tr>
                <td className="table__header-text">OBJECT</td>
                <td className="table__header-text">ORIGIN</td>
                <td className="table__header-text app__hide-on-mobile">
                  PURPOSE
                </td>
                <td className="table__header-text app__hide-on-mobile">
                  CONFIDENCE
                </td>
                <td className="table__header-text">LAST SEEN BY</td>
              </tr>
            </thead>
            <tbody className="table__body">
              {renderObjectsCollectedRows()}
            </tbody>
          </table>
        ) : (
          <div>
            <NavLink className="app__nav-link" to="/how">
              <p className="profile__none-yet-text">None yet</p>
              <span className="app__yellow-button--small">
                How to track Satellites
              </span>
            </NavLink>
          </div>
        )}
      </section>

      <section className="profile__your-observations-wrapper">
        <h2 className="profile__sub-heading">YOUR OBSERVATIONS</h2>
        <table className="table">
          <thead className="table__header">
            <tr>
              <td className="table__header-text">DATE</td>
              <td className="table__header-text">OBJECT</td>
              <td className="table__header-text">
                <p className="app__hide-on-mobile">QUALITY</p>
                <p className="app__hide-on-desktop">QUAL..</p>
              </td>
              <td className="table__header-text">
                <p className="app__hide-on-mobile">TIME DIFF</p>
                <p className="app__hide-on-desktop">DIFF..</p>
              </td>
              <td className="table__header-text">
                <p className="app__hide-on-mobile">WEIGHT</p>
                <p className="app__hide-on-desktop">WT.</p>
              </td>
            </tr>
          </thead>
          <tbody className="table__body">
            {userData.observation_history.length !== 0 ? (
              renderYourObservationsRows()
            ) : (
              <p className="profile__none-yet-text">None yet</p>
            )}
          </tbody>
        </table>
      </section>
    </div>
  ) : (
    <Spinner />
  );
}

// POST request
// /profile
// receives JWT and returns object
// This query is unique to an individual user
const data = {
  user_name: "Scott Tilley",
  user_image:
    "https://i.amz.mshcdn.com/KCJWkZNiwPyNXPcV0CN7yeL8G0A=/fit-in/1200x9600/https%3A%2F%2Fblueprint-api-production.s3.amazonaws.com%2Fuploads%2Fcard%2Fimage%2F784551%2F0e3defde-7d59-4d94-b094-51d187f930da.jpg",
  user_location: "Brixton, UK",
  user_email: "scott@space-cadet.com", // not used in render but will be passed to the "settings" component to save us another query
  observation_count: "59000",
  number_objects_tracked: "403",
  average_observation_quality: "65", // a percentage value
  user_bio: "yada yada bio here...",
  // objects they have tracked after we processes their observations (IODs submitted)
  // maybe confirmed_observations is a better name?
  // sorted by most recent
  objects_observed: [
    {
      object_norad_number: "12345", // used to for routing to the object page for this given object
      object_name: "SL-27 R/B",
      object_origin: "france",
      object_type: "satelitte",
      object_primary_purpose: "military",
      object_secondary_purpose: "communications",
      observation_quality: "50", // the quality of this individual observation
      time_last_tracked: "1550398277",
      address_last_tracked: "0x1863a72A0244D603Dcd00CeD99b94d517207716a",
      username_last_tracked: "username"
    },
    {
      object_norad_number: "12345",
      object_name: "SL-27 R/B",
      object_origin: "france",
      object_type: "satelitte",
      object_primary_purpose: "military",
      object_secondary_purpose: "communications",
      observation_quality: "50",
      time_last_tracked: "1550398277",
      address_last_tracked: "0x1863a72A0244D603Dcd00CeD99b94d517207716a",
      username_last_tracked: "username"
    },
    {
      object_norad_number: "12345",
      object_name: "SL-27 R/B",
      object_origin: "france",
      object_type: "satelitte",
      object_primary_purpose: "military",
      object_secondary_purpose: "communications",
      observation_quality: "50",
      time_last_tracked: "1550398277",
      address_last_tracked: "0x1863a72A0244D603Dcd00CeD99b94d517207716a",
      username_last_tracked: "username"
    }
  ],
  // essentially a full history of their IOD submissions
  // sorted by most recent
  // limit to 500 observations
  observation_history: [
    {
      observation_time: "1550398277", // timestamp will be used to populate the date AND time fields in UI
      object_name: "SL-27 R/B",
      object_norad_number: "12345", // again, not used for rendering, placing here to aid with routing to object info page
      observation_quality: "34",
      observation_time_difference: "1.42", // seconds - will be a plus or minus value
      observation_weight: "30", // a percentage value
      observation_iod:
        "28537 05 004A   4353 G 20190324193958688 56 75 0850592+471197 16 S"
    },
    {
      observation_time: "1550398277",
      object_name: "SL-27 R/B",
      object_norad_number: "12345",
      observation_quality: "34",
      observation_time_difference: "1.42",
      observation_weight: "30",
      observation_iod:
        "28537 05 004A   4353 G 20190324193958688 56 75 0850592+471197 16 S"
    },
    {
      observation_time: "1550398277",
      object_name: "SL-27 R/B",
      object_norad_number: "12345",
      observation_quality: "34",
      observation_time_difference: "1.42",
      observation_weight: "30",
      observation_iod:
        "28537 05 004A   4353 G 20190324193958688 56 75 0850592+471197 16 S"
    }
  ]
};
