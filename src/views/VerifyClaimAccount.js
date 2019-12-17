import React, { useState, useEffect } from "react";
import axios from "axios";
import { NavLink } from "react-router-dom";
import jwt_decode from "jwt-decode";
import { createWallet, createSecret } from "../auth/auth-helpers";
import { API_ROOT } from "../app/app-helpers";
import { useAuthState, useAuthDispatch } from "../auth/auth-context";
import Spinner from "../app/components/Spinner";

export default function VerifyClaimAccount({ match }) {
  const [isExpired, setIsExpired] = useState(false);
  const [password, setPassword] = useState("");
  const [retypedPassword, setRetypedPassword] = useState("");
  const [showInvalidPasswordError, setShowInvalidPasswordError] = useState(
    false
  );
  const [showUnmatchedPasswordError, setShowUnmatchedPasswordError] = useState(
    false
  );
  const [understandMessage, setUnderstandMessage] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState(``);
  const [isSuccess, setIsSuccess] = useState(false);
  const { userAddress } = useAuthState();
  const authDispatch = useAuthDispatch();

  useEffect(() => {
    const getExpiry = async () => {
      // get expiry timestamp for jwt and current timestamp
      const { exp } = await jwt_decode(match.params.jwt);
      const currentTimestamp = Math.floor(Date.now() / 1000);

      if (currentTimestamp > exp) {
        setIsExpired(true);
      }
    };

    getExpiry();
  }, [match.params.jwt, isExpired]);

  const inputsAreValid = () => {
    setShowInvalidPasswordError(false);
    setShowUnmatchedPasswordError(false);

    // will return true if string contains at least 1 number
    const hasNumber = string => {
      var regex = /\d/g;
      return regex.test(string);
    };
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
    setIsLoading(true);
    setIsSuccess(false);
    setErrorMessage(``);

    if (inputsAreValid()) {
      const wallet = createWallet();
      const secret = createSecret(wallet.signingKey.privateKey, password);

      try {
        const response = await axios.post(
          `${API_ROOT}/verifyClaimAccount`,
          JSON.stringify({
            jwt: match.params.jwt,
            address: wallet.signingKey.address,
            secret: secret
          })
        );
        setIsSuccess(true);
        authDispatch({ type: "SET_JWT", payload: response.data.jwt });
        const { address } = await jwt_decode(response.data.jwt);
        authDispatch({ type: "SET_USER_ADDRESS", payload: address });
        localStorage.setItem("trusat-jwt", response.data.jwt);
      } catch (error) {
        setErrorMessage(error.toString());
      }
      setPassword("");
      setRetypedPassword("");
      setIsLoading(false);
    }
  };

  return isLoading ? (
    <Spinner />
  ) : (
    <div className="verify-claim-account__wrapper">
      <h1 className="verify-claim-account__header">Verify Claimed Account</h1>
      {/* Don't show the form when user has successfully claimed, i.e. they received an email containing a secret 
      Or if JWT has expired after 24 hours
      */}
      {!isSuccess && !isExpired ? (
        <form
          className="app__form"
          onSubmit={event => {
            event.preventDefault();
            verifyClaimAccount();
          }}
        >
          <label className="app__form__label">NEW PASSWORD</label>
          <input
            required
            className="app__form__input"
            type="password"
            onChange={event => setPassword(event.target.value)}
            value={password}
          ></input>
          <label className="app__form__label">RE-ENTER NEW PASSWORD</label>
          <input
            required
            className="app__form__input"
            type="password"
            onChange={event => setRetypedPassword(event.target.value)}
            value={retypedPassword}
          ></input>
          <div className="app__form__checkbox-and-message-wrapper">
            <input
              required
              className="app__form__checkbox"
              type="checkbox"
              checked={understandMessage}
              onChange={() => setUnderstandMessage(!understandMessage)}
            ></input>
            <p>
              I understand I cannot change this password in the future, and that
              TruSat cannot restore this password for me. I've saved it
              somewhere safe.
            </p>
          </div>

          {showInvalidPasswordError ? (
            <div className="app__form__error">
              Please choose a password that is at least 8 characters long and
              contains one number
            </div>
          ) : null}

          {showUnmatchedPasswordError ? (
            <div className="app__form__error">
              The passwords you have entered do not match
            </div>
          ) : null}

          {isExpired ? null : (
            <button type="submit" className="app__white-button--small">
              Submit
            </button>
          )}
        </form>
      ) : null}

      {isExpired ? (
        <div>
          <p className="claim-account__message">
            You waited more than 24 hours to complete the claim account process.
            Please start the process over again by returning to{" "}
            <NavLink to="/claim" className="app__nav-link app__link">
              here
            </NavLink>
            {` `}
            and make sure to disregard all previous "claim account" emails you
            may have received.
          </p>
        </div>
      ) : null}

      {isSuccess ? (
        <div className="login__success-wrapper">
          <p className="claim-account__message">
            You have now claimed ownership of your TruSat account! We have
            emailed you a "secret" that will be required along with your email
            and password to log in from now on.
          </p>
          <NavLink className="app__nav-link" to={`/profile/${userAddress}`}>
            <span className="app__button--white">Go to Profile</span>
          </NavLink>
        </div>
      ) : null}
      {errorMessage ? (
        <p className="app__error-message">
          Something went wrong... {errorMessage}
        </p>
      ) : null}
    </div>
  );
}
