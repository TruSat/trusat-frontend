import React from "react";
import { useAuthState, useAuthDispatch } from "../auth-context";
import { retrieveNonce, retrieveJwt } from "../helpers/";
import { ethers } from "ethers";
import Web3 from "web3";
import axios from "axios";

export default function MetaMask() {
  const { isAuthenticating } = useAuthState();
  const dispatch = useAuthDispatch();

  const handleClick = async () => {
    if (window.ethereum.selectedAddress) {
      handleMessageSign();
    } else {
      handleMetamaskConnect();
    }
  };

  const handleMetamaskConnect = () => {
    // user has metamask but they are not signed in to the plugin
    if (window.ethereum.selectedAddress === undefined) {
      alert("Please sign in to MetaMask plugin and try again!");
      window.ethereum.enable().catch(console.error);
      // metamask plugin not found
    } else {
      alert("You do not have the MetaMask plugin installed!");
    }
  };

  const handleMessageSign = async () => {
    dispatch({ type: "AUTHENTICATING", payload: true });

    const web3 = new Web3(Web3.givenProvider || window.ethereum);

    const address = web3._provider.selectedAddress;

    const nonce = await retrieveNonce(address);
    console.log(`nonce = `, nonce);

    const nonceHash = ethers.utils.id(nonce);

    try {
      //a promise
      const signedMessage = await web3.eth.personal.sign(nonceHash, address);

      console.log(`signed message =`, signedMessage);

      return handleAuthenticate({ address, signedMessage });
    } catch (error) {
      dispatch({ type: "AUTHENTICATING", payload: false });
      alert(`You need to sign the message to be able to log in!`);
    }
  };

  // TODO utilize retrieve JWT function from helpers
  const handleAuthenticate = async ({ address, signedMessage }) => {
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
    <span className="metamask-button" onClick={handleClick}>
      {isAuthenticating ? "Loading..." : "MetaMask"}
    </span>
  );
}
