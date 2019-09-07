import React, { useState } from "react";
import { useAuthState, useAuthDispatch } from "../auth/auth-context";
import { useUserDispatch } from "../user/user-context";
import { decryptSecret, retrieveNonce } from "../auth/helpers";
import { ethers } from "ethers";
import Web3 from "web3";
import axios from "axios";
import CircleCheck from "../assets/CircleCheck.svg";

export default function MetamaskImport() {
  const [step, setStep] = useState(1);

  const [secret, setSecret] = useState(
    "3235776040/74bef427ec535b0640b9f2476560a6e0/98cc58cc57fbbdc33fc23983066ad421239a65304847a6fc68f2e2eb07bf32d273a7d8203cca1f457c42880ea2671fbf15f2fdec25e96858d922f4e25d34294b1ececdadab32f42b5858fc4d27f50303"
  );
  const [password, setPassword] = useState("Zn48&NJFLPjr");
  const [privateKey, setPrivateKey] = useState("");

  const { authType } = useAuthState();
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
    authDispatch({ type: "AUTHENTICATED", payload: true });
    authDispatch({ type: "AUTHENTICATING", payload: false });
  };

  return (
    <section className="metamask-import__wrapper">
      {/* STEP ONE */}
      {/* TODO - do not show step one if they have already installed metamask */}
      <h2
        className={
          step > 1
            ? "metamask-import__step-header--done"
            : "metamask-import__step-header--todo"
        }
      >
        {step > 1 ? <img src={CircleCheck} alt="circled check"></img> : null}
        Step 1: Get MetaMask
      </h2>
      {step === 1 ? (
        <div className="metamask-import__copy-wrapper">
          <p className="metamask-import__copy">
            You'll need MetaMask to secure your account. MetaMask is a browser
            extension that acts as a secure vault for your private and valuable
            information stored on the blockchain
          </p>
          <span
            className={
              window.ethereum
                ? "app__black-button--small"
                : "app__white-button--small"
            }
          >
            <a
              className={
                window.ethereum
                  ? "metamask-import__link-text--white"
                  : "metamask-import__link-text--black"
              }
              href="https://metamask.io"
              target="_blank"
              rel="noopener noreferrer"
            >
              Get MetaMask
            </a>
          </span>
          <p className="metamask-import__copy">
            It will take a few steps to get up, but its worth it- by installing
            MetaMask, you'll upgrade your regular web browser so that you can
            access the decentralized web
          </p>

          <span
            className="app__white-button--small"
            onClick={() => {
              // if metamask plugin IS found
              if (window.ethereum) {
                setStep(2);
                // if metamask plugin ISN'T found
              } else {
                alert("You do not have the MetaMask plugin installed!");
              }
            }}
          >
            I've installed MetaMask
          </span>
        </div>
      ) : null}

      {/* STEP TWO */}
      {step >= 2 ? (
        <h2
          className={
            step > 2
              ? "metamask-import__step-header--done"
              : "metamask-import__step-header--todo"
          }
        >
          {step > 2 ? <img src={CircleCheck} alt="circled check"></img> : null}
          Step 2: Retrieve your secret
        </h2>
      ) : null}
      {step === 2 ? (
        <div className="metamask-import__copy-wrapper">
          <p className="metamask-import__copy">
            We need to make sure its really you. Please enter the secret we
            emailed you when you first signed up for TruSat and the password you
            created for your account
          </p>
          <div className="secret-form__wrapper">
            <label className="secret-form__label">SECRET</label>
            <input
              className="secret-form__input"
              type="text"
              value={secret}
              onChange={event => setSecret(event.target.value)}
            ></input>
            <label className="secret-form__label">PASSWORD</label>
            <input
              className="secret-form__input"
              type="password"
              value={password}
              onChange={event => setPassword(event.target.value)}
            ></input>
          </div>{" "}
          {/* TODO - next button will decrypt the secret and return private key, then mpve to step 3 */}
          <div className="metamask-import__button-wrapper">
            <span
              className="app__black-button--small metamask-import__back-button"
              onClick={() => {
                setStep(1);
              }}
            >
              BACK
            </span>
            <span
              className="app__white-button--small"
              onClick={() => {
                setPrivateKey(decryptSecret(secret, password));
                setStep(3);
              }}
            >
              NEXT
            </span>
          </div>
        </div>
      ) : null}

      {/* STEP THREE */}
      {step >= 3 ? (
        <h2
          className={
            step > 3
              ? "metamask-import__step-header--done"
              : "metamask-import__step-header--todo"
          }
        >
          {step > 3 ? <img src={CircleCheck} alt="circled check"></img> : null}
          Step 3: Transfer your private key
        </h2>
      ) : null}
      {step === 3 ? (
        <div className="metamask-import__copy-wrapper">
          <p className="metamask-import__copy">
            Now MetaMask needs to make sure its really you.
          </p>
          <p className="metamask-import__copy">1. Copy your private key:</p>
          {/* TODO - this needs to obscure the private key until they click it, then
          offer ability to copy it with a click */}
          <div className="metamask-import__private-key-wrapper">
            <p className="metamask-import__private-key-text">{privateKey}</p>
            <button
              onClick={() => {
                navigator.clipboard.writeText(privateKey);
              }}
            >
              copy
            </button>
          </div>
          <p className="metamask-import__copy">
            2. Login to MetaMask if you haven't already done so and click on
            your avatar
          </p>
          <p className="metamask-import__copy">3. Select "import account"</p>
          <p className="metamask-import__copy">4. Paste in your private key</p>
          <div>
            <span
              className="app__black-button--small metamask-import__back-button"
              onClick={() => {
                setStep(2);
              }}
            >
              BACK
            </span>
            <span
              className="app__white-button--small"
              onClick={async () => {
                window.ethereum.enable().catch(console.error);
                setStep(4);
              }}
            >
              I've imported my private key to MetaMask
            </span>
          </div>
        </div>
      ) : null}

      {/* STEP FOUR */}
      {step >= 4 ? (
        <h2
          className={
            step > 4
              ? "metamask-import__step-header--done"
              : "metamask-import__step-header--todo"
          }
        >
          {step > 4 ? <img src={CircleCheck} alt="circled check"></img> : null}
          Step 4: Connect TruSat to MetaMask
        </h2>
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

      {/* STEP FIVE */}
      {step >= 5 ? (
        <h2
          className={
            authType === "metamask"
              ? "metamask-import__step-header--done"
              : "metamask-import__step-header--todo"
          }
        >
          {authType === "metamask" ? (
            <img src={CircleCheck} alt="circled check"></img>
          ) : null}
          Step 5: Sign message
        </h2>
      ) : null}
      {step === 5 && authType !== "metamask" ? (
        <div className="metamask-import__copy-wrapper">
          <p className="metamask-import__copy">last step!</p>
          <p className="metamask-import__copy">
            Click the "sign" button in MetaMask to sign into TruSat
          </p>
        </div>
      ) : null}

      {/* The success message */}
      {authType === "metamask" ? (
        <div className="metamask-import__copy-wrapper">
          <p className="metamask-import__copy">
            Congrats you have now successfully migrated your account to MetaMask
            and signed in!
          </p>
          <p className="metamask-import__copy">
            In future, choose the option to sign in to TruSat using the MetaMask
            option. Its will be as simple as signing a message to verify your
            identity from now on!
          </p>
          <p className="metamask-import__copy">
            If you wish to take your TruSat identity with you to other browsers,
            you can read more on our FAQ page
          </p>
        </div>
      ) : null}
    </section>
  );
}
