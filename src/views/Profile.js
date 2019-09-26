import React, { useState, useEffect, Fragment } from "react";
import { useTrusatGetApi } from "../app/helpers";
import ProfileHeader from "../profile/components/ProfileHeader";
import ObjectsCollectedTable from "../profile/components/ObjectsCollectedTable";
import ObservationsTable from "../profile/components/ObservationsTable";
import Spinner from "../app/components/Spinner";
import { useAuthState } from "../auth/auth-context";
import { useProfileDispatch } from "../profile/profile-context";

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
  const { jwt } = useAuthState();
  const profileDispatch = useProfileDispatch();

  const [isAddressError, setIsAddressError] = useState(false);
  const [{ isLoading, isError, data }, doFetch] = useTrusatGetApi();

  useEffect(() => {
    if (!isAddress(addressFromRoute)) {
      setIsAddressError(true);
    } else {
      doFetch(`/profile/${addressFromRoute}`);
      profileDispatch({ type: "SET_PROFILE_DATA", payload: data });
    }
  }, [addressFromRoute, doFetch, data, profileDispatch]);

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
