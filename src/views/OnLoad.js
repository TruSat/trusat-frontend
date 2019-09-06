import React, { useEffect } from "react";
import axios from "axios";
import { useAuthDispatch } from "../auth/auth-context";
import { useUserDispatch } from "../user/user-context";
import { ethers } from "ethers";
import jwt_decode from "jwt-decode";

export default function OnLoad() {
  const authDispatch = useAuthDispatch();
  const userDispatch = useUserDispatch();

  useEffect(() => {
    // get jwt from local storage, utilized for all login options
    const retrieveJwt = () => {
      if (localStorage.getItem("trusat-jwt")) {
        const jwt = localStorage.getItem("trusat-jwt");
        authDispatch({ type: "SET_JWT", payload: jwt });
        authDispatch({ type: "AUTHENTICATED", payload: true });

        const { address } = jwt_decode(jwt);

        axios
          .post(
            `https://api.consensys.space:8080/profile`,
            JSON.stringify({
              jwt: jwt,
              address: address
            })
          )
          .then(result => {
            userDispatch({ type: "SET_USER_DATA", payload: result.data });
            userDispatch({ type: "SHOW_USER_PROFILE", payload: true });
          })
          .catch(err => console.log(err));
      }
    };

    // get burner wallet from local storage, utilized for burner login only
    const retrieveWallet = () => {
      if (localStorage.getItem("trusat-private-key")) {
        const privateKey = localStorage.getItem("trusat-private-key");
        const wallet = new ethers.Wallet(privateKey);

        authDispatch({ type: "SET_BURNER", payload: wallet });
        authDispatch({
          type: "SET_ADDRESS",
          payload: wallet.signingKey.address
        });
        authDispatch({ type: "SET_AUTH_TYPE", payload: "burner" });
      }
    };
    retrieveJwt();
    retrieveWallet();

    // TODO - pull this inside the retreieve jwt function and take address from returned result

    // ToDO - create an app context to handle a shared 'app' state for things like loading state
    // setIsAppLoading(false);
  }, [authDispatch, userDispatch]);

  return <React.Fragment></React.Fragment>;
}
