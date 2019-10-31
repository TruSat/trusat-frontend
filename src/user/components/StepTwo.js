import React, { useState } from "react";
import CircleCheck from "../../assets/CircleCheck.svg";
import { decryptSecret } from "../../auth/auth-helpers";
import ReactGA from "react-ga";

export default function StepTwo({ step, setStep, setPrivateKey }) {
  const [secret, setSecret] = useState("");
  const [password, setPassword] = useState("");
  const [showPrivateKeyError, setShowPrivateKeyError] = useState(false);

  const handleSubmit = () => {
    const privateKey = decryptSecret(secret, password);

    // fail the move to next step if a valid private key is not returned from decrptSecret
    if (privateKey.length !== 66) {
      setShowPrivateKeyError(true);
      return;
    } else {
      setPrivateKey(privateKey);
      setStep(3);
    }
  };

  return (
    <React.Fragment>
      {step >= 2 ? (
        <div className="metamask-import__step-header-wrapper">
          {step > 2 ? (
            <img
              className="metamask-import__circle-check"
              src={CircleCheck}
              alt="circled check"
            ></img>
          ) : null}
          <h2
            className={
              step > 2
                ? "metamask-import__step-header--done"
                : "metamask-import__step-header--todo"
            }
          >
            Step 2: Retrieve your secret
          </h2>
        </div>
      ) : null}

      {step === 2 ? (
        <div className="metamask-import__copy-wrapper">
          <p className="metamask-import__copy">
            We need to make sure its really you. Please enter the secret we
            emailed you when you first signed up for TruSat and the password you
            created for your account
          </p>
          <form
            className="email-form"
            onSubmit={event => {
              event.preventDefault();
              handleSubmit();
            }}
          >
            <label className="email-form__label secret-form__label">
              SECRET
            </label>
            <input
              required
              className="email-form__input"
              type="text"
              value={secret}
              onChange={event => setSecret(event.target.value)}
            ></input>
            <label className="email-form__label secret-form__label">
              PASSWORD
            </label>
            <input
              required
              className="email-form__input"
              type="password"
              value={password}
              onChange={event => setPassword(event.target.value)}
            ></input>

            {showPrivateKeyError ? (
              <div className="email-form__error">
                Invalid password and secret code combination. Please make sure
                you have enetered both correctly and try again.
              </div>
            ) : null}

            <div className="metamask-import__button-wrapper">
              <span
                className="app__black-button--small metamask-import__back-button"
                onClick={() => {
                  setStep(1);
                }}
              >
                BACK
              </span>
              <button
                type="submit"
                className="app__white-button--small"
                onClick={() => {
                  ReactGA.event({
                    category: "MetaMask",
                    action: `Securing account with MetaMask flow`,
                    label: `Finished Step TWO by providing secret and password`
                  });
                }}
              >
                NEXT
              </button>
            </div>
          </form>{" "}
          {/* TODO - next button will decrypt the secret and return private key, then mpve to step 3 */}
        </div>
      ) : null}
    </React.Fragment>
  );
}
