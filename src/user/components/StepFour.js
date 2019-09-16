import React from "react";
import CircleCheck from "../../assets/CircleCheck.svg";
import { retrieveNonce } from "../../auth/helpers";
import { ethers } from "ethers";
import Web3 from "web3";
import axios from "axios";
import { useAuthDispatch } from "../../auth/auth-context";
import { useUserDispatch } from "../../user/user-context";

export default function StepFive({ step, setStep }) {
  const authDispatch = useAuthDispatch();
  const userDispatch = useUserDispatch();

  const handleMessageSign = async () => {
    authDispatch({ type: "AUTHENTICATING", payload: true });

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
      authDispatch({ type: "AUTHENTICATING", payload: false });
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
          authDispatch({ type: "SET_JWT", payload: response.data.jwt });
        })
        .catch(error => console.log(error))
    );
    userDispatch({ type: "SET_USER_ADDRESS", payload: address });
    authDispatch({ type: "SET_AUTH_TYPE", payload: "metamask" });
    authDispatch({ type: "AUTHENTICATING", payload: false });
  };

  return (
    <React.Fragment>
      {step >= 4 ? (
        <div className="metamask-import__step-header-wrapper">
          {step > 4 ? (
            <img
              className="metamask-import__circle-check"
              src={CircleCheck}
              alt="circled check"
            ></img>
          ) : null}
          <h2
            className={
              step > 4
                ? "metamask-import__step-header--done"
                : "metamask-import__step-header--todo"
            }
          >
            Step 4: Connect TruSat to MetaMask
          </h2>
        </div>
      ) : null}

      {step === 4 ? (
        <div className="metamask-import__copy-wrapper">
          <p className="metamask-import__copy">
            MetaMask should have prompted you to confirm the connection. This is
            to confirm that you trust TruSat before going any further. Click
            "connect" in MetaMask. If the request to connect doesn't appear, you
            may be already connected and can proceed to next step.
          </p>
          {/* // TODO - this button needs to pop metamask up to show the sign message request */}
          <div className="metamask-import__button-wrapper">
            <span
              className="app__black-button--small metamask-import__back-button"
              onClick={() => {
                setStep(3);
              }}
            >
              BACK
            </span>
            <span
              className="app__white-button--small"
              onClick={() => {
                handleMessageSign();
                setStep(5);
              }}
            >
              I've confirmed connection in MetaMask
            </span>
          </div>
        </div>
      ) : null}
    </React.Fragment>
  );
}
