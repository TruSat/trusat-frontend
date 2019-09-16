import React, { useState } from "react";
import CircleCheck from "../../assets/CircleCheck.svg";
import { decryptSecret } from "../../auth/helpers";

export default function StepTwo({ step, setStep, setPrivateKey }) {
  const [secret, setSecret] = useState(
    "3235776040/74bef427ec535b0640b9f2476560a6e0/98cc58cc57fbbdc33fc23983066ad421239a65304847a6fc68f2e2eb07bf32d273a7d8203cca1f457c42880ea2671fbf15f2fdec25e96858d922f4e25d34294b1ececdadab32f42b5858fc4d27f50303"
  );
  const [password, setPassword] = useState("Zn48&NJFLPjr");

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
    </React.Fragment>
  );
}
