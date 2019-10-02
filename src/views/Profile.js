import React, { useState, useEffect, Fragment } from "react";
import { useTrusatGetApi } from "../app/app-helpers";
import ProfileHeader from "../profile/components/ProfileHeader";
import ObjectsCollectedTable from "../profile/components/ObjectsCollectedTable";
import ObservationsTable from "../profile/components/ObservationsTable";
import Spinner from "../app/components/Spinner";
import { useAuthState } from "../auth/auth-context";
import { isAddress } from "../auth/auth-helpers";
import { useProfileDispatch } from "../profile/profile-context";
import ReactGA from "react-ga";

export default function Profile({ match }) {
  ReactGA.pageview(window.location.pathname + window.location.search);

  const addressFromRoute = match.params.address;
  const { jwt } = useAuthState();
  const profileDispatch = useProfileDispatch();

  const [isAddressError, setIsAddressError] = useState(false);
  const [{ isLoading, isError, data }, doFetch] = useTrusatGetApi();

  useEffect(() => {
    if (!isAddress(addressFromRoute)) {
      setIsAddressError(true);
    } else {
      if (typeof jwt === "string") {
        doFetch(`/profile?address=${addressFromRoute}&jwt=${jwt}`);
      }
    }

    if (data.length !== 0) {
      profileDispatch({ type: "SET_PROFILE_DATA", payload: data });
    }
  }, [jwt, addressFromRoute, doFetch, data, profileDispatch]);

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
