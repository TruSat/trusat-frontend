import React, { useState, useEffect, Fragment } from "react";
import axios from "axios";
import { API_ROOT, useTrusatGetApi } from "../app/app-helpers";
import Spinner from "../app/components/Spinner";

export default function Error() {
  const [{ data, isLoading, errorMessage }, doFetch] = useTrusatGetApi();

  // const [isLoading, setIsLoading] = useState(false);
  // const [errorMessage, setErrorMessage] = useState(``);

  useEffect(() => {
    doFetch(`/errorTest`);

    // async function fetchError() {
    //   setIsLoading(true);

    //   try {
    //     const result = await axios.get(`${API_ROOT}/errorTest`);
    //     console.log(`result = `, result);
    //   } catch (error) {
    //     console.log(`error = `, error);
    //     setErrorMessage(error.toString());
    //   }

    //   setIsLoading(false);
    // }

    // fetchError();
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
