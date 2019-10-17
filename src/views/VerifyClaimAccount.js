import React, { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import jwt_decode from "jwt-decode";
import { createWallet, createSecret } from "../auth/auth-helpers";
import { useTrusatPostApi } from "../app/app-helpers";
import { useAuthState, useAuthDispatch } from "../auth/auth-context";
import Spinner from "../app/components/Spinner";

export default function VerifyClaimAccount({ match }) {
  const [password, setPassword] = useState("");
  const [retypedPassword, setRetypedPassword] = useState("");
  const [showInvalidPasswordError, setShowInvalidPasswordError] = useState(
    false
  );
  const [showUnmatchedPasswordError, setShowUnmatchedPasswordError] = useState(
    false
  );
  const [{ isLoading, isError, data }, doPost, withData] = useTrusatPostApi();
  const [isSuccess, setIsSuccess] = useState(false);
  const { userAddress } = useAuthState();
  const authDispatch = useAuthDispatch();

  useEffect(() => {
    const logUserIn = async () => {
      authDispatch({ type: "SET_JWT", payload: data.jwt });
      const { address } = await jwt_decode(data.jwt);
      authDispatch({ type: "SET_USER_ADDRESS", payload: address });
      localStorage.setItem("trusat-jwt", data.jwt);
      setIsSuccess(true);
    };

    if (data.length !== 0) {
      logUserIn();
    }
  }, [data, authDispatch]);

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
    if (inputsAreValid()) {
      const wallet = createWallet();
      const secret = createSecret(wallet.signingKey.privateKey, password);

      await doPost(`/verifyClaimAccount`);
      await withData(
        JSON.stringify({
          jwt: match.params.jwt,
          address: wallet.signingKey.address,
          secret: secret
        })
      );

      setPassword("");
      setRetypedPassword("");
    }
  };

  return isLoading ? (
    <Spinner />
  ) : (
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
          onChange={event => setRetypedPassword(event.target.value)}
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
      {isError ? (
        <p className="app__error-message">Something went wrong...</p>
      ) : null}
    </div>
  );
}
