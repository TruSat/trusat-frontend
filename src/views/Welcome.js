import React, { useState, useEffect } from "react";
import { useAuthDispatch, useAuthState } from "../auth/auth-context";
import { ethers } from "ethers";

export default function Home() {
  const [isAppLoading, setIsAppLoading] = useState(true);
  const { isAuth } = useAuthState();
  const dispatch = useAuthDispatch();

  useEffect(() => {
    // get jwt from local storage, utilized for all login options
    const retrieveJwt = () => {
      if (localStorage.getItem("mvp-jwt")) {
        const jwt = localStorage.getItem("mvp-jwt");
        dispatch({ type: "SET_JWT", payload: jwt });
        dispatch({ type: "AUTHENTICATED", payload: true });
      }
    };
    // get burner wallet from local storage, utilized for burner login only
    const retrieveWallet = () => {
      if (localStorage.getItem("mvp-private-key")) {
        const privateKey = localStorage.getItem("mvp-private-key");
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
    retrieveWallet();
    setIsAppLoading(false);
  }, [dispatch]);

  return <React.Fragment>This the welcome page!</React.Fragment>;
}
