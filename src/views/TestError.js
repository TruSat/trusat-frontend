import React, { useEffect, Fragment } from "react";
import { useTrusatGetApi } from "../app/app-helpers";
import Spinner from "../app/components/Spinner";

export default function Error() {
  const [{ data, isLoading, errorMessage }, doFetch] = useTrusatGetApi();

  useEffect(() => {
    doFetch(`/errorTest`);
  }, [doFetch]);

  return (
    <Fragment>
      <div>This is a component for testing errors</div>
      {isLoading ? (
        <Spinner />
      ) : errorMessage ? (
        <p className="app__error-message">{errorMessage}</p>
      ) : (
        <div>Success!</div>
      )}
    </Fragment>
  );
}
