import React, { useState, Fragment } from "react";
import { useAuthState, useAuthDispatch } from "../auth-context";
import {
  retrieveNonce,
  metamaskSignMessage,
  retrieveMetamaskJwt
} from "../helpers/";
import Web3 from "web3";
import { handleMetamaskConnect } from "../helpers";
const web3 = new Web3(Web3.givenProvider || window.ethereum);

export default function MetaMask({ buttonText }) {
  const { isAuthenticating } = useAuthState();
  const authDispatch = useAuthDispatch();
  const [isError, setIsError] = useState(false);

  const handleClick = async () => {
    if (window.ethereum.selectedAddress) {
      authDispatch({ type: "AUTHENTICATING", payload: true });
      handleMetamaskAuth();
      // if user has metamask but isn't signed into the plugin
    } else {
      handleMetamaskConnect();
    }
  };

  // For both signup and login metamask flows
  const handleMetamaskAuth = async () => {
    const address = web3._provider.selectedAddress;

    const nonce = await retrieveNonce(address);

    const metamaskSignedMessage = await metamaskSignMessage({ nonce, address });

    // Only hit /profile endpoint if a signed message is returned from metamaskSignedMessage
    if (typeof metamaskSignedMessage === "string") {
      const jwt = await retrieveMetamaskJwt({ address, metamaskSignedMessage });

      authDispatch({ type: "SET_USER_ADDRESS", payload: address });
      authDispatch({ type: "SET_JWT", payload: jwt });
      authDispatch({ type: "SET_AUTH_TYPE", payload: "metamask" });
      // Add jwt to local storage
      localStorage.setItem("trusat-jwt", jwt);
    } else {
      // When user cancels the sign or there is an error returned from metamaskSignMessage
      alert(
        `You must sign the message by clicking "Sign" on the MetaMask plugin in order to verify your identity!`
      );
    }
    authDispatch({ type: "AUTHENTICATING", payload: false });
  };

  return (
    <Fragment>
      <span className="app__button--white" onClick={handleClick}>
        {isAuthenticating ? "Loading..." : buttonText}
      </span>
      {isError ? (
        <p className="app__error-message">Something went wrong ...</p>
      ) : null}
    </Fragment>
  );
}
