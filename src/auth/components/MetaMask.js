import React from "react";
import { useAuthState, useAuthDispatch } from "../auth-context";
import { useUserDispatch } from "../../user/user-context";
import { retrieveNonce } from "../helpers/";
import { ethers } from "ethers";
import Web3 from "web3";
import axios from "axios";
import { handleMetamaskConnect } from "../helpers";

export default function MetaMask() {
  // used for text render on the button
  const pathname = window.location.pathname;

  const { isAuthenticating } = useAuthState();
  const authDispatch = useAuthDispatch();
  const userDispatch = useUserDispatch();

  const handleClick = async () => {
    if (window.ethereum.selectedAddress) {
      authDispatch({ type: "AUTHENTICATING", payload: true });
      handleMetamaskMessageSign();
    } else {
      handleMetamaskConnect();
    }
  };

  const handleMetamaskMessageSign = async () => {
    const web3 = new Web3(Web3.givenProvider || window.ethereum);

    const address = web3._provider.selectedAddress;

    const nonce = await retrieveNonce(address);
    console.log(`nonce = `, nonce);

    const nonceHash = ethers.utils.id(nonce);

    try {
      //a promise
      const signedMessage = await web3.eth.personal.sign(nonceHash, address);

      console.log(`signed message =`, signedMessage);

      return handleMetamaskAuthenticate({ address, signedMessage });
    } catch (error) {
      authDispatch({ type: "AUTHENTICATING", payload: false });
      alert(`You need to sign the message to be able to log in!`);
    }
  };

  // TODO utilize retrieve JWT function from helpers
  const handleMetamaskAuthenticate = async ({ address, signedMessage }) => {
    let jwt;

    await Promise.resolve(
      axios
        .post(
          "https://api.consensys.space:8080/login",
          JSON.stringify({
            address: address,
            signedMessage: signedMessage
          })
        )
        .then(response => {
          console.log(response.data);
          jwt = response.data.jwt;
          localStorage.setItem("trusat-jwt", response.data.jwt);
          authDispatch({ type: "SET_JWT", payload: response.data.jwt });
        })
        .catch(error => console.log(error))
    );

    // TODO make this call an app helper
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
        userDispatch({ type: "SET_USER_ADDRESS", payload: address });
        userDispatch({ type: "SHOW_USER_PROFILE", payload: true });
      })
      .catch(err => console.log(err));

    authDispatch({ type: "SET_AUTH_TYPE", payload: "metamask" });
    authDispatch({ type: "AUTHENTICATING", payload: false });
  };

  return (
    <span className="app__button--white" onClick={handleClick}>
      {isAuthenticating
        ? "Loading..."
        : pathname === "/signup"
        ? "Sign up with MetaMask"
        : "Sign in with MetaMask"}
    </span>
  );
}
