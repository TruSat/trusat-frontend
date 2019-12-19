import React, { useState, useEffect, Fragment } from "react";
import { useTrusatGetApi } from "../app/app-helpers";
import axios from "axios";
import Spinner from "../app/components/Spinner";

export default function TestCookie() {
  const [{ data, isLoading, errorMessage }, doFetch] = useTrusatGetApi();

  useEffect(() => {
    doFetch(`/cookieMonster`);
  }, [doFetch]);

  return (
    <Fragment>
      <div>This is a component for testing cookies</div>
      {isLoading ? (
        <Spinner />
      ) : errorMessage ? (
        <p className="app__error-message">{errorMessage}</p>
      ) : null}
    </Fragment>
  );
}

// export default function TestCookie() {
//   // const [{ data, isLoading, errorMessage }, doFetch] = useTrusatGetApi();
//   const [isLoading, setIsLoading] = useState(false);
//   const [errorMessage, setErrorMessage] = useState(``);

//   useEffect(() => {
//     // doFetch(`/cookieMonster`);

//     async function fetchCookie() {
//       setIsLoading(true);

//       try {
//         const response = await axios.get(
//           `https://api.consensys.space:8080/cookieMonster`,
//           { withCredentials: true }
//         );
//         console.log(response);
//       } catch (error) {
//         console.log(error);
//         setErrorMessage(error.toString());
//       }
//     }

//     fetchCookie();
//     setIsLoading(false);
//   }, []);

//   return (
//     <Fragment>
//       <div>This is a component for testing cookies</div>
//       {isLoading ? (
//         <Spinner />
//       ) : errorMessage ? (
//         <p className="app__error-message">{errorMessage}</p>
//       ) : null}
//     </Fragment>
//   );
// }

// export default function TestCookie() {
//   // const [{ data, isLoading, errorMessage }, doFetch] = useTrusatGetApi();
//   const [isLoading, setIsLoading] = useState(false);
//   const [errorMessage, setErrorMessage] = useState(``);

//   useEffect(() => {
//     // doFetch(`/cookieMonster`);

//     async function fetchCookie() {
//       setIsLoading(true);

//       try {
//         const response = await fetch(
//           `https://api.consensys.space:8080/cookieMonster`
//         );
//         console.log(response);
//       } catch (error) {
//         console.log(error);
//         setErrorMessage(error.toString());
//       }
//     }

//     fetchCookie();
//     setIsLoading(false);
//   }, []);

//   return (
//     <Fragment>
//       <div>This is a component for testing cookies</div>
//       {isLoading ? (
//         <Spinner />
//       ) : errorMessage ? (
//         <p className="app__error-message">{errorMessage}</p>
//       ) : null}
//     </Fragment>
//   );
// }
