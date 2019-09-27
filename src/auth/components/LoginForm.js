import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import { ethers } from "ethers";
import { useAuthState, useAuthDispatch } from "../auth-context";
import { retrieveNonce, signMessage, retrieveJwt } from "../helpers/";
import { decryptSecret } from "../helpers";

export default function LoginForm() {
  const { isAuthenticating } = useAuthState();
  const authDispatch = useAuthDispatch();
  const [email, setEmail] = useState("bobthecryptonoob@gmail.com");
  const [password, setPassword] = useState("G46*xuYNW3LQ");
  const [secret, setSecret] = useState(
    "527831024/05b66ecd6b04f66e6e07271005d743e2/ffe380721f92da440832d5b82466dbc582f83d8991f684f207761b2fca1a5de40d6d85de1d82ae03bbfdc775028e3dc92fbea99aafd736495c6365f78fa7869388fef5230346d0a7c8439d6fb86c493c"
  );
  const [showPrivateKeyError, setShowPrivateKeyError] = useState(false);
  const [isError, setIsError] = useState(false);

  const handleLogin = async () => {
    setIsError(false);
    authDispatch({ type: "AUTHENTICATING", payload: true });

    const privateKey = decryptSecret(secret, password);
    // fail the log in attempt if a valid private key is not returned from decrptSecret
    if (!privateKey) {
      setShowPrivateKeyError(true);
      authDispatch({ type: "AUTHENTICATING", payload: false });
      return;
    }

    let wallet = new ethers.Wallet(privateKey);

    const nonce = await retrieveNonce(wallet.signingKey.address);

    const signedMessage = signMessage({ nonce, wallet });

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
