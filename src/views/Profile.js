import React, { useState, useEffect, Fragment } from "react";
import axios from "axios";
import { API_ROOT } from "../app/helpers";
import ProfileHeader from "../profile/components/ProfileHeader";
import ObjectsCollectedTable from "../profile/components/ObjectsCollectedTable";
import ObservationsTable from "../profile/components/ObservationsTable";
import Spinner from "../app/components/Spinner";
import { useAuthState } from "../auth/auth-context";
import { useProfileDispatch } from "../profile/profile-context";
import { useUserState } from "../user/user-context";

const isAddress = address => {
  // check if it has the basic requirements of an address
  if (!/^(0x)?[0-9a-f]{40}$/i.test(address)) {
    return false;
    // If it's ALL lowercase or ALL upppercase
  }
  // else if (
  //   /^(0x|0X)?[0-9a-f]{40}$/.test(address) ||
  //   /^(0x|0X)?[0-9A-F]{40}$/.test(address)
  // ) {
  //   return true;
  // }
  return true;
};

export default function Profile({ match }) {
  const addressFromRoute = match.params.address;
  const { jwt, userAddress } = useAuthState();
  const { userData } = useUserState();
  const profileDispatch = useProfileDispatch();

  const [isAddressError, setIsAddressError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    let didCancel = false;

    const fetchData = async () => {
      setIsError(false);
      setIsLoading(true);

      try {
        console.log(`fetching profile data`);
        const result = await axios.post(
          `${API_ROOT}/profile`,
          JSON.stringify({
            jwt: jwt,
            address: addressFromRoute
            // leo's address for testing
            // address: "0x5C760Ba09C12E4fd33be49f1B05E6E1e648EB312"
          })
        );

        if (!didCancel) {
          profileDispatch({ type: "SET_PROFILE_DATA", payload: result.data });
          console.log(result.data);
        }
      } catch (error) {
        if (!didCancel) {
          setIsError(true);
        }
      }
      setIsLoading(false);
    };

    if (!isAddress(addressFromRoute)) {
      setIsAddressError(true);
    } else {
      // if userAddress is present through and userAddress value is not equaled to address found in route, fetchData
      if (userAddress && userAddress !== addressFromRoute) {
        fetchData();
        // else if userData is present from app load load it into the UI
      } else if (userData) {
        profileDispatch({ type: "SET_PROFILE_DATA", payload: userData });
      }
    }
  }, [
    addressFromRoute,
    jwt,
    userAddress,
    userData,
    profileDispatch,
    setIsLoading,
    isAddressError
  ]);

  return isAddressError ? (
    <p className="app__error-message">
      Invalid ethereum address found in the URL. Please double check the address
      you are trying to look up and refresh your browser.
    </p>
  ) : isLoading ? (
    <Spinner />
  ) : (
    <Fragment>
      {isError ? (
        <p className="app__error-message">Something went wrong ...</p>
      ) : (
        <div className="profile__wrapper">
          <ProfileHeader />
          <ObjectsCollectedTable />
          <ObservationsTable />
        </div>
      )}
    </Fragment>
  );
}
