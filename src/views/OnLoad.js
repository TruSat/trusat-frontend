import React, { useEffect } from "react";
import { useAuthDispatch } from "../auth/auth-context";
import { ethers } from "ethers";

export default function OnLoad() {
  const dispatch = useAuthDispatch();

  useEffect(() => {
    // get jwt from local storage, utilized for all login options
    const retrieveJwt = () => {
      if (localStorage.getItem("trusat-jwt")) {
        const jwt = localStorage.getItem("trusat-jwt");
        dispatch({ type: "SET_JWT", payload: jwt });
        dispatch({ type: "AUTHENTICATED", payload: true });
      }
    };

    // get address from local storage
    const retrieveAddress = () => {
      if (localStorage.getItem("trusat-address")) {
        const address = localStorage.getItem("trusat-address");
        dispatch({ type: "SET_ADDRESS", payload: address });
      }
    };

    // get burner wallet from local storage, utilized for burner login only
    const retrieveWallet = () => {
      if (localStorage.getItem("trusat-private-key")) {
        const privateKey = localStorage.getItem("trusat-private-key");
        const wallet = new ethers.Wallet(privateKey);

        dispatch({ type: "SET_BURNER", payload: wallet });
        dispatch({
          type: "SET_ADDRESS",
          payload: wallet.signingKey.address
        });
        dispatch({ type: "SET_AUTH_TYPE", payload: "burner" });
      }
    };
    retrieveJwt();
    retrieveAddress();
    retrieveWallet();
    // ToDO - create an app context to handle a shared 'app' state for things like loading state
    // setIsAppLoading(false);
  }, [dispatch]);

  return <React.Fragment></React.Fragment>;
}
