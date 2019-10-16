import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import { ethers } from "ethers";
import { useAuthState, useAuthDispatch } from "../auth-context";
import {
  isPrivateKey,
  retrieveNonce,
  signMessage,
  retrieveJwt,
  decryptSecret
} from "../auth-helpers";

export default function LoginForm() {
  const { isAuthenticating } = useAuthState();
  const authDispatch = useAuthDispatch();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [secret, setSecret] = useState("");
  const [showPrivateKeyError, setShowPrivateKeyError] = useState(false);
  const [isError, setIsError] = useState(false);

  const handleLogin = async () => {
    setIsError(false);
    authDispatch({ type: "AUTHENTICATING", payload: true });
    // get private key from the secret using the users password
    const privateKey = decryptSecret(secret, password);
    // fail the log in attempt if a valid private key is not returned from decrptSecret
    if (!isPrivateKey(privateKey)) {
      setShowPrivateKeyError(true);
      authDispatch({ type: "AUTHENTICATING", payload: false });
      return;
    }
    // create wallet for signing message
    let wallet = new ethers.Wallet(privateKey);
    // get unique nonce from server for this user
    const nonce = await retrieveNonce({ address: wallet.signingKey.address });
    // sign the nonce
    const signedMessage = signMessage({ nonce, wallet });
    // get JSON web token that will be used to keep user logged in
    const jwt = await retrieveJwt({
      // dont send email to backend on log in - not required for auth
      email: null,
      address: wallet.signingKey.address,
      signedMessage: signedMessage
    });
    // do not attempt to hit /profile unless a valid jwt is returned from retriveJwt
    if (!jwt) {
      setIsError(true);
      authDispatch({ type: "AUTHENTICATING", payload: false });
      return;
    }

    authDispatch({
      type: "SET_USER_ADDRESS",
      payload: wallet.signingKey.address
    });
    authDispatch({ type: "SET_AUTH_TYPE", payload: "email" });
    authDispatch({ type: "SET_JWT", payload: jwt });
    // add jwt to local storage so user will stayed logged in until expiry
    localStorage.setItem("trusat-jwt", jwt);

    authDispatch({ type: "AUTHENTICATING", payload: false });
  };

  return isError ? (
    <p className="app__error-message">Something went wrong ...</p>
  ) : (
    <form
      className="email-form"
      onSubmit={event => {
        event.preventDefault();
        handleLogin();
      }}
    >
      <label className="email-form__label">Email</label>
      <input
        required
        type="email"
        className="email-form__input"
        onChange={event => setEmail(event.target.value)}
        value={email}
      />

      <label className="email-form__label">Password</label>
      <input
        required
        type="password"
        className="email-form__input"
        onChange={event => setPassword(event.target.value)}
        value={password}
      />

      <label className="email-form__label">Secret code</label>
      <input
        required
        type="text"
        className="email-form__input"
        onChange={event => setSecret(event.target.value)}
        value={secret}
      />

      {showPrivateKeyError ? (
        <div className="email-form__error">
          Invalid password and secret code combination. Please make sure you
          have enetered both correctly and try again.
        </div>
      ) : null}

      <div className="email-form__button-wrapper">
        <NavLink className="app__nav-link" to="/">
          <span className="email-form__button--black">Cancel</span>
        </NavLink>
        <button className="email-form__button--white">
          {isAuthenticating ? `...Loading` : `Log in`}
        </button>
      </div>

      <div className="email-form__link-to-login-wrapper">
        <p>Dont' have an account?</p>
        <NavLink className="app__nav-link" to="/signup">
          <p className="email-form__sign-up-text">Sign up</p>
        </NavLink>
      </div>
    </form>
  );
}
