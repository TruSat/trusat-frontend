import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import { ethers } from "ethers";
import { useAuthState, useAuthDispatch } from "../auth-context";
import {
  isPrivateKey,
  retrieveNonce,
  signMessage,
  retrieveLoginCredentials,
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
    const loginCredentials = await retrieveLoginCredentials({
      // dont send email to backend on log in - not required for auth
      email: null,
      address: wallet.signingKey.address,
      signedMessage: signedMessage
    });
    // do not attempt to hit /profile unless auth hasn't expired
    if (!loginCredentials) {
      setIsError(true);
      authDispatch({ type: "AUTHENTICATING", payload: false });
      return;
    }
    // Add address to auth state
    authDispatch({
      type: "SET_USER_ADDRESS",
      payload: wallet.signingKey.address
    });
    // Add expiry date of auth to auth state
    authDispatch({
      type: "SET_AUTH_EXPIRY",
      payload: loginCredentials.exp
    });
    authDispatch({ type: "SET_AUTH_TYPE", payload: "email" });
    // add login crednetials to local storage so user will stayed logged in until expiry
    localStorage.setItem("trusat-login-credentials", loginCredentials);

    authDispatch({ type: "AUTHENTICATING", payload: false });
  };

  return isError ? (
    <p className="app__error-message">Something went wrong ...</p>
  ) : (
    <form
      className="app__form"
      onSubmit={event => {
        event.preventDefault();
        handleLogin();
      }}
    >
      <label className="app__form__label">Email</label>
      <input
        required
        type="email"
        className="app__form__input"
        onChange={event => setEmail(event.target.value)}
        value={email}
      />

      <label className="app__form__label">Password</label>
      <input
        required
        type="password"
        className="app__form__input"
        onChange={event => setPassword(event.target.value)}
        value={password}
      />

      <label className="app__form__label">Secret code</label>
      <input
        required
        type="text"
        className="app__form__input"
        onChange={event => setSecret(event.target.value)}
        value={secret}
      />

      {showPrivateKeyError ? (
        <div className="app__form__error">
          Invalid password and secret code combination. Please make sure you
          have enetered both correctly and try again.
        </div>
      ) : null}

      <div className="app__form__button-wrapper">
        <NavLink className="app__nav-link" to="/">
          <span className="app__form__button--cancel">Cancel</span>
        </NavLink>
        <button className="app__form__button--white">
          {isAuthenticating ? `...Loading` : `Log in`}
        </button>
      </div>
    </form>
  );
}
