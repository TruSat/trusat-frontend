import React, { useState } from "react";
import axios from "axios";
import { API_ROOT } from "../app/helpers";
import { createWallet, createSecret } from "../auth/helpers";
import { useAuthDispatch } from "../auth/auth-context";

export default function VerifyClaimAccount({ match }) {
  const [password, setPassword] = useState("");
  const [retypedPassword, setRetypedPasswprd] = useState("");
  const [showMessage, setShowMessage] = useState(false);
  const authDispatch = useAuthDispatch();

  const [showInvalidPasswordError, setShowInvalidPasswordError] = useState(
    false
  );
  const [showUnmatchedPasswordError, setShowUnmatchedPasswordError] = useState(
    false
  );

  const handleFormValidation = () => {
    // will return true if string contains at least 1 number
    function hasNumber(string) {
      var regex = /\d/g;
      return regex.test(string);
    }
    // check if user enters a password that is at least 8 chracters long and contains one number
    if (password.length < 8 || !hasNumber(password)) {
      setShowInvalidPasswordError(true);
      return false;
    }
    // check that password and retyped password have same value
    if (password !== retypedPassword) {
      setShowUnmatchedPasswordError(true);
      return false;
    }
    // two checks have passed
    return true;
  };

  const verifyClaimAccount = async () => {
    const inputsAreValid = handleFormValidation();

    if (inputsAreValid) {
      const wallet = createWallet();
      const secret = createSecret(wallet.signingKey.privateKey, password);

      await axios
        .post(
          `${API_ROOT}/verifyClaimAccount`,
          JSON.stringify({
            jwt: match.params.jwt,
            address: wallet.signingKey.address,
            secret: secret
          })
        )
        .then(response => {
          console.log(response);
          localStorage.setItem("trusat-jwt", response.data.jwt);
          authDispatch({ type: "SET_JWT", payload: response.data.jwt });
          authDispatch({
            type: "SET_USER_ADDRESS",
            payload: wallet.signingKey.address
          });
          setShowMessage(true);
          setShowInvalidPasswordError(false);
          setShowUnmatchedPasswordError(false);
        })
        .catch(err => {
          console.log(err);
          setShowInvalidPasswordError(false);
          setShowUnmatchedPasswordError(false);
        });

      setPassword("");
      setRetypedPasswprd("");
    }
  };

  return (
    <div className="verify-claim-account__wrapper">
      <h1 className="verify-claim-account__header">Verify Claimed Account</h1>
      <form
        className="email-form"
        onSubmit={event => {
          event.preventDefault();
          verifyClaimAccount();
        }}
      >
        <label className="email-form__label">NEW PASSWORD</label>
        <input
          required
          className="email-form__input"
          type="password"
          onChange={event => setPassword(event.target.value)}
          value={password}
        ></input>
        <label className="email-form__label">RE-ENTER NEW PASSWORD</label>
        <input
          required
          className="email-form__input"
          type="password"
          onChange={event => setRetypedPasswprd(event.target.value)}
          value={retypedPassword}
        ></input>

        {showInvalidPasswordError ? (
          <div className="email-form__error">
            Please choose a password that is at least 8 characters long and
            contains one number
          </div>
        ) : null}

        {showUnmatchedPasswordError ? (
          <div className="email-form__error">
            The passwords you have entered do not match
          </div>
        ) : null}

        <button type="submit" className="app__white-button--small">
          Submit
        </button>
      </form>
      {showMessage ? (
        <p className="claim-account__message">
          Your have now claimed ownership of your TruSat account! We have
          emailed you a "secret" that will be required along with your email and
          password to log in from now on.
        </p>
      ) : null}
    </div>
  );
}
