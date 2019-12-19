import React, { useState, useEffect, Fragment } from "react";
import { useTrusatGetApi } from "../app/app-helpers";
import axios from "axios";
import Spinner from "../app/components/Spinner";

// ----------
// FETCH
// ----------

// export default function TestError() {
//   const [isLoading, setIsLoading] = useState(false);
//   const [errorMessage, setErrorMessage] = useState(``);

//   useEffect(() => {
//     async function fetchErrorMessage() {
//       setIsLoading(true);

//       try {
//         const response = await fetch(
//           `https://api.consensys.space:8080/errorTest`
//         );
//         console.log(`fetch success = `, response);
//       } catch (error) {
//         console.log(`fetch error = `, JSON.stringify(error));
//         setErrorMessage(error.toString());
//       }
//     }

//     fetchErrorMessage();
//     setIsLoading(false);
//   }, []);

//   return (
//     <Fragment>
//       <div>This is a component for testing error messaging</div>
//       {isLoading ? (
//         <Spinner />
//       ) : errorMessage ? (
//         <p className="app__error-message">{errorMessage}</p>
//       ) : null}
//     </Fragment>
//   );
// }

// ----------
// AXIOS CALL
// ----------

// export default function TestError() {
//   const [isLoading, setIsLoading] = useState(false);
//   const [errorMessage, setErrorMessage] = useState(``);

//   useEffect(() => {
//     async function fetchErrorMessage() {
//       setIsLoading(true);

//       try {
//         const response = await axios.get(
//           `https://api.consensys.space:8080/errorTest`
//         );
//         console.log(`axios success = `, response);
//       } catch (error) {
//         console.log(`error = `, error.response.data);
//         setErrorMessage(error.toString());
//         console.log(`axios error = `, JSON.stringify(error));
//       }
//     }

//     fetchErrorMessage();
//     setIsLoading(false);
//   }, []);

//   return (
//     <Fragment>
//       <div>This is a component for testing error messaging</div>
//       {isLoading ? (
//         <Spinner />
//       ) : errorMessage ? (
//         <p className="app__error-message">{errorMessage}</p>
//       ) : null}
//     </Fragment>
//   );
// }

// ----------
// AXIOS HOOK
// ----------

export default function TestError() {
  const [{ data, isLoading, errorMessage }, doFetch] = useTrusatGetApi();

  useEffect(() => {
    doFetch(`/errorTest`);
  }, [doFetch, errorMessage]);

  return (
    <Fragment>
      <div>This is a component for testing error messaging</div>
      {isLoading ? (
        <Spinner />
      ) : errorMessage ? (
        <p className="app__error-message">{errorMessage.error}</p>
      ) : null}
    </Fragment>
  );
}
