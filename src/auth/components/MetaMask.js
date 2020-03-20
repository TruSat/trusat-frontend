import React, { useState, Fragment } from "react";
import { useAuthState, useAuthDispatch } from "../auth-context";
import {
  retrieveNonce,
  metamaskSignMessage,
  retrieveMetamaskLoginCredentials,
  handleMetamaskConnect
} from "../auth-helpers";
import Web3 from "web3";
import ReactGA from "react-ga";
import Button from "../../app/components/Button";
import { QuestionMarkToolTip } from "../../app/app-helpers";

const web3 = new Web3(Web3.givenProvider || window.ethereum);

export default function MetaMask({ buttonText, GAEvent }) {
  const { isAuthenticating } = useAuthState();
  const authDispatch = useAuthDispatch();
  const [error, setError] = useState(``);

  const handleClick = async () => {
    if (window.ethereum.selectedAddress) {
      authDispatch({ type: "AUTHENTICATING", payload: true });
      handleMetamaskAuth();
      if (GAEvent) {
        ReactGA.event({
          category: "MetaMask",
          action: `Securing account with MetaMask flow`,
          label: `Finished the process by confirming connection in MetaMask and signing a message`
        });
      }
      // if user has metamask but isn't signed into the plugin
    } else {
      handleMetamaskConnect();
    }
  };

  // For both signup and login metamask flows
  const handleMetamaskAuth = async () => {
    setError(``);

    const address = web3._provider.selectedAddress;

    const nonce = await retrieveNonce({ address });

    // if false in returned instead of nonce of type string
    if (!nonce) {
      setError("log in failed as a random nonce was not received");
    }

    const metamaskSignedMessage = await metamaskSignMessage({ nonce, address });

    // Only hit /profile endpoint if a signed message is returned from metamaskSignedMessage
    if (typeof metamaskSignedMessage === "string") {
      const metamaskLoginCredentials = await retrieveMetamaskLoginCredentials({
        address,
        metamaskSignedMessage
      });
      // only log user in and add credentaisl to local storage if credentials are valid
      if (!metamaskLoginCredentials) {
        setError(`Log in failed because your log in credentials are not valid`);
      } else {
        // Add address to auth state
        authDispatch({ type: "SET_USER_ADDRESS", payload: address });
        // Add expiry date of auth to auth state
        authDispatch({
          type: "SET_AUTH_EXPIRY",
          payload: metamaskLoginCredentials.exp
        });
        authDispatch({ type: "SET_AUTH_TYPE", payload: "metamask" });
        // Add login credentials to local storage
        localStorage.setItem(
          "trusat-login-credentials",
          JSON.stringify(metamaskLoginCredentials)
        );
      }
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
      {window.ethereum ? (
        <span className="app__button--white" onClick={handleClick}>
          {isAuthenticating ? "...Loading" : buttonText}
        </span>
      ) : (
        // When app detects user does not have web3 injected by metamask
        <Fragment>
          <a
            href="https://metamask.io"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Button text="USE METAMASK" color="white" />
            {` `}
            <QuestionMarkToolTip
              toolTipText={
                "A browser plugin to replace email/password identification"
              }
            />
          </a>
        </Fragment>
      )}
      {error ? <p className="app__error-message">{error}</p> : null}
    </Fragment>
  );
}
