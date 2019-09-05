import React from "react";
import { useAuthState, useAuthDispatch } from "../auth-context";
import { retrieveNonce, retrieveJwt } from "../helpers/";
import { ethers } from "ethers";
import Web3 from "web3";
import axios from "axios";
import { handleMetamaskConnect } from "../helpers";

export default function MetaMask() {
  // used for text render on the button
  const pathname = window.location.pathname;

  const { isAuthenticating } = useAuthState();
  const dispatch = useAuthDispatch();

  const handleClick = async () => {
    if (window.ethereum.selectedAddress) {
      dispatch({ type: "AUTHENTICATING", payload: true });
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
      dispatch({ type: "AUTHENTICATING", payload: false });
      alert(`You need to sign the message to be able to log in!`);
    }
  };

  // TODO utilize retrieve JWT function from helpers
  const handleMetamaskAuthenticate = async ({ address, signedMessage }) => {
    Promise.resolve(
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
          localStorage.setItem("trusat-jwt", response.data.jwt);
          localStorage.setItem("trusat-address", address);
          dispatch({ type: "SET_JWT", payload: response.data.jwt });
        })
        .catch(error => console.log(error))
    );

    dispatch({
      type: "SET_ADDRESS",
      payload: address
    });
    dispatch({ type: "SET_AUTH_TYPE", payload: "metamask" });
    dispatch({ type: "AUTHENTICATED", payload: true });
    dispatch({ type: "AUTHENTICATING", payload: false });
  };

  return (
    <span className="app__metamask-button" onClick={handleClick}>
      {isAuthenticating
        ? "Loading..."
        : pathname === "/signup"
        ? "Sign up with MetaMask"
        : "Sign in with MetaMask"}
    </span>
  );
}
