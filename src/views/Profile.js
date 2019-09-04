import React, { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import axios from "axios";
import { useAuthState } from "../auth/auth-context";
import Blockie from "react-blockies";
import ObjectBadge from "../assets/ObjectBadge.svg";
import Spinner from "../app/components/Spinner";

export default function Profile({ match }) {
  // TODO - add if statement to use address found in auth state before using the match address
  const address = match.params.address;
  const { jwt } = useAuthState();
  const [userData, setUserData] = useState([]);
  const [showProfile, setShowProfile] = useState(false);

  useEffect(() => {
    console.log(`jwt =`, jwt);
    console.log(`address =`, address);

    // TODO
    // this endpoint needs to work when it only receives address
    // this way users who dont have a jwt in localtorage can view a profile
    // the profile will render appropriately according to the provacy settings
    if (jwt && address) {
      axios
        .post(
          `https://api.consensys.space:8080/profile`,
          JSON.stringify({ jwt: jwt, address: address })
        )
        .then(result => {
          console.log(result.data);
          setUserData(result.data);
          setShowProfile(true);
        })
        .catch(err => console.log(err));
    }
  }, [address, jwt, setUserData]);

  const renderObjectsTrackedTable = () => {
    return userData.objects_observed.map(obj => (
      <NavLink
        key={userData.objects_observed.indexOf(obj)}
        style={{ color: "white", textDecoration: "none" }}
        to={`/object/${obj.object_norad_number}`}
      >
        <div className="table__row">
          <div className="table__badge-name-wrapper">
            <img
              style={{ marginLeft: "-35px" }}
              src={ObjectBadge}
              alt="Object Badge"
            ></img>
            &nbsp;
            <p>{obj.object_name}</p>
          </div>

          <div className="table__center-wrapper">
            <img
              className="table__small-text"
              src={`https://www.countryflags.io/${obj.object_origin}/flat/32.png`}
              alt={`${obj.object_origin} flag `}
            />
            &nbsp;
            <p className="table__small-text">
              {obj.object_primary_purpose ? obj.object_primary_purpose : "?"}
            </p>
          </div>

          <div className="table__center-wrapper">
            <p className="table__small-text">
              {obj.object_type ? obj.object_type : "?"}
            </p>
            &nbsp;
            <p className="table__small-text">
              {obj.object_secondary_purpose
                ? obj.object_secondary_purpose
                : null}
            </p>
          </div>

          <p className="table__small-text">{obj.observation_quality}</p>

          <div className="table__spotted-by-wrapper">
            <p className="table__small-text">
              {`last spotted `}
              {obj.time_last_tracked} {` by `}
              {obj.username_last_tracked}
            </p>
          </div>
        </div>
      </NavLink>
    ));
  };

  // const convertTimestamp = timestamp => {
  //   const dateObj = new Date(timestamp * 1000);
  //   return `${dateObj.getMonth() + 1}/${dateObj.getDate()}`;
  // };

  const renderObservationHistoryTable = () => {
    return userData.observation_history.map(observation => (
      <tr
        key={userData.observation_history.indexOf(observation)}
        className="profile__obervations-table-body-row"
      >
        <td className="table__small-text">{observation.observation_time}</td>
        <td>{observation.object_name}</td>
        <td className="table__small-text">{observation.observation_quality}</td>
        <td className="table__small-text">
          {observation.observation_time_difference}
        </td>
        <td className="table__small-text">{observation.observation_weight}</td>
        <td className="table__small-text">{observation.observation_iod}</td>
      </tr>
    ));
  };

  return showProfile ? (
    <div className="profile__wrapper">
      <section className="profile__header-wrapper">
        <Blockie
          seed={address}
          size={30}
          scale={3}
          // color="#dfe"
          // bgColor="#ffe"
          // spotColor="#abc"
        />
        <div className="profile__header-info-wrapper">
          <h1 className="profile__header-username">{userData.user_name}</h1>
          <div className="profile__header-info-data-wrapper">
            <div className="profile__header-info-data-key">
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
            &nbsp;
            <div className="profile__header-info-data-key">
              {userData.number_objects_tracked ? (
                <p className="profile__header-info-data-value">
                  {userData.number_objects_tracked}
                </p>
              ) : (
                <p className="profile__header-info-data-value">?</p>
              )}
              &nbsp; OBJECTS TRACKED
            </div>
            &nbsp;
            <div className="profile__header-info-data-key">
              {userData.observation_count ? (
                <p className="profile__header-info-data-value">
                  {userData.observation_count}
                </p>
              ) : (
                <p className="profile__header-info-data-value">?</p>
              )}
              &nbsp; OBSERVATIONS
            </div>
            &nbsp;
            <div className="profile__header-info-data-key">
              {userData.average_observation_quality ? (
                <p className="profile__header-info-data-value">
                  {userData.average_observation_quality}
                </p>
              ) : (
                <p className="profile__header-info-data-value">?</p>
              )}
              &nbsp; <p>AVG. ACCURACY</p>
            </div>
          </div>
        </div>

        <NavLink style={{ color: "white" }} to="/settings">
          Settings
        </NavLink>
      </section>

      <section className="profile__bio-wrapper">
        <h2 className="profile__background-header">BACKGROUND</h2>
        <p>{userData.user_bio ? userData.user_bio : "?"}</p>
      </section>

      <section className="profile__objects-tracked-wrapper">
        <h2 className="profile__sub-heading">OBJECTS TRACKED</h2>
        <div className="table__wrapper">{renderObjectsTrackedTable()}</div>
      </section>

      <section className="profile__your-observations-wrapper">
        <h2 className="profile__sub-heading">YOUR OBSERVATIONS</h2>
        <table className="profile__obervations-table">
          <thead className="profile__observations-table-header">
            <tr className="profile__observations-table-header-row">
              <td>DATE</td>
              <td>OBJECT</td>
              <td>QUALITY</td>
              <td>TIME DIFF</td>
              <td>WEIGHT</td>
              <td>IOD</td>
            </tr>
          </thead>
          <tbody className="profile__observations-table-body">
            {renderObservationHistoryTable()}
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

{
  /* <h2 className="profile__sub-heading">YOUR OBSERVATIONS</h2>
        <div className="profile__observation-table-header-wrapper">
          <div className="profile__observation-table-left-wrapper">
            <p className="profile__observation-table-date-text">DATE</p>
            &nbsp;
            <p className="profile__observation-table-object-name-text">
              OBJECT
            </p>
          </div>

          <div className="profile__observation-table-right-wrapper">
            <p className="profile__observation-table-quality-text">QUALITY</p>
            <p className="profile__observation-table-time-difference-text">
              TIME DIFF
            </p>
            <p className="profile__observation-table-weight-text">WEIGHT</p>
            <p className="profile__observation-table-iod-text">IOD</p>
          </div>
        </div> */
}
