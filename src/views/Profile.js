import React, { useEffect } from "react";
import axios from "axios";
import ProfileHeader from "../user/components/ProfileHeader";
import ObjectsCollectedTable from "../user/components/ObjectsCollectedTable";
import ObservationsTable from "../user/components/ObservationsTable";

import Spinner from "../app/components/Spinner";
import { useAuthState } from "../auth/auth-context";
import { useUserState, useUserDispatch } from "../user/user-context";

export default function Profile({ match }) {
  const addressFromRoute = match.params.address;
  const { jwt } = useAuthState();
  const { showUserProfile } = useUserState();
  const userDispatch = useUserDispatch();

  useEffect(() => {
    const fetchData = async () => {
      console.log(`fetching user data`);

      userDispatch({ type: "SHOW_USER_PROFILE", payload: false });

      await axios
        .post(
          `https://api.consensys.space:8080/profile`,
          JSON.stringify({
            jwt: jwt,
            address: addressFromRoute
            // leo's address for testing
            // address: "0x5C760Ba09C12E4fd33be49f1B05E6E1e648EB312"
          })
        )
        .then(result => {
          userDispatch({ type: "SET_USER_DATA", payload: result.data });
          userDispatch({ type: "SHOW_USER_PROFILE", payload: true });
        })
        .catch(err => console.log(err));
    };
    fetchData();
  }, [jwt, addressFromRoute, userDispatch]);

  return showUserProfile ? (
    <div className="profile__wrapper">
      <ProfileHeader />
      <ObjectsCollectedTable />
      <ObservationsTable />
    </div>
  ) : (
    <Spinner />
  );
}

// POST request
// /profile
// receives JWT and returns object
// This query is unique to an individual user
// const data = {
//   user_name: "Scott Tilley",
//   user_image:
//     "https://i.amz.mshcdn.com/KCJWkZNiwPyNXPcV0CN7yeL8G0A=/fit-in/1200x9600/https%3A%2F%2Fblueprint-api-production.s3.amazonaws.com%2Fuploads%2Fcard%2Fimage%2F784551%2F0e3defde-7d59-4d94-b094-51d187f930da.jpg",
//   user_location: "Brixton, UK",
//   user_email: "scott@space-cadet.com", // not used in render but will be passed to the "settings" component to save us another query
//   observation_count: "59000",
//   number_objects_tracked: "403",
//   average_observation_quality: "65", // a percentage value
//   user_bio: "yada yada bio here...",
//   // objects they have tracked after we processes their observations (IODs submitted)
//   // maybe confirmed_observations is a better name?
//   // sorted by most recent
//   objects_observed: [
//     {
//       object_norad_number: "12345", // used to for routing to the object page for this given object
//       object_name: "SL-27 R/B",
//       object_origin: "france",
//       object_type: "satelitte",
//       object_primary_purpose: "military",
//       object_secondary_purpose: "communications",
//       observation_quality: "50", // the quality of this individual observation
//       time_last_tracked: "1550398277",
//       address_last_tracked: "0x1863a72A0244D603Dcd00CeD99b94d517207716a",
//       username_last_tracked: "username"
//     },
//     {
//       object_norad_number: "12345",
//       object_name: "SL-27 R/B",
//       object_origin: "france",
//       object_type: "satelitte",
//       object_primary_purpose: "military",
//       object_secondary_purpose: "communications",
//       observation_quality: "50",
//       time_last_tracked: "1550398277",
//       address_last_tracked: "0x1863a72A0244D603Dcd00CeD99b94d517207716a",
//       username_last_tracked: "username"
//     },
//     {
//       object_norad_number: "12345",
//       object_name: "SL-27 R/B",
//       object_origin: "france",
//       object_type: "satelitte",
//       object_primary_purpose: "military",
//       object_secondary_purpose: "communications",
//       observation_quality: "50",
//       time_last_tracked: "1550398277",
//       address_last_tracked: "0x1863a72A0244D603Dcd00CeD99b94d517207716a",
//       username_last_tracked: "username"
//     }
//   ],
//   // essentially a full history of their IOD submissions
//   // sorted by most recent
//   // limit to 500 observations
//   observation_history: [
//     {
//       observation_time: "1550398277", // timestamp will be used to populate the date AND time fields in UI
//       object_name: "SL-27 R/B",
//       object_norad_number: "12345", // again, not used for rendering, placing here to aid with routing to object info page
//       observation_quality: "34",
//       observation_time_difference: "1.42", // seconds - will be a plus or minus value
//       observation_weight: "30", // a percentage value
//       observation_iod:
//         "28537 05 004A   4353 G 20190324193958688 56 75 0850592+471197 16 S"
//     },
//     {
//       observation_time: "1550398277",
//       object_name: "SL-27 R/B",
//       object_norad_number: "12345",
//       observation_quality: "34",
//       observation_time_difference: "1.42",
//       observation_weight: "30",
//       observation_iod:
//         "28537 05 004A   4353 G 20190324193958688 56 75 0850592+471197 16 S"
//     },
//     {
//       observation_time: "1550398277",
//       object_name: "SL-27 R/B",
//       object_norad_number: "12345",
//       observation_quality: "34",
//       observation_time_difference: "1.42",
//       observation_weight: "30",
//       observation_iod:
//         "28537 05 004A   4353 G 20190324193958688 56 75 0850592+471197 16 S"
//     }
//   ]
// };
