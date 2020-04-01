import React, { useState, useEffect, Fragment } from "react";
import { useTrusatGetApi } from "../app/app-helpers";
import ProfileHeader from "../profile/components/ProfileHeader";
import ObjectsCollectedTable from "../profile/components/ObjectsCollectedTable";
import ObservationsTable from "../profile/components/ObservationsTable";
import Spinner from "../app/components/Spinner";
import { isAddress } from "../auth/auth-helpers";
import { useProfileDispatch } from "../profile/profile-context";

export default function Profile({ match }) {
  const addressFromRoute = match.params.address;
  const profileDispatch = useProfileDispatch();

  const [isAddressError, setIsAddressError] = useState(false);
  const [{ isLoading, isError, data }, doFetch] = useTrusatGetApi();

  useEffect(() => {
    if (!isAddress(addressFromRoute)) {
      setIsAddressError(true);
    } else {
      doFetch(`/profile?address=${addressFromRoute}`);
    }

    // Only add the data to app state when it is populated
    if (data) {
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
