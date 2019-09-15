import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import { ethers } from "ethers";
import { useAuthState, useAuthDispatch } from "../auth-context";
import { useUserDispatch } from "../../user/user-context";
import { retrieveNonce, signMessage, retrieveJwt } from "../helpers/";
import { decryptSecret } from "../helpers";
import axios from "axios";

export default function LoginForm() {
  const { isAuthenticating } = useAuthState();
  const authDispatch = useAuthDispatch();
  const userDispatch = useUserDispatch();
  const [email, setEmail] = useState("bobthecryptonoob@gmail.com");
  const [password, setPassword] = useState("Zn48&NJFLPjr");
  const [secret, setSecret] = useState(
    "3059463708/771ad0458152dfeb563e1719cc1ca7ba/17da8a731ee571f1e0707d4a57dd83b7ecba0225b8a6829d1ee6a8c2b2248ca025d82c61f7a6da915d749325879986b3ff536eaafc01d82fd27d515c790c4ff03c6e4f23941b91c24414d831739ecdbd"
  );
  const [showPrivateKeyError, setShowPrivateKeyError] = useState(false);

  const handleLogin = async () => {
    authDispatch({ type: "AUTHENTICATING", payload: true });

    const privateKey = decryptSecret(secret, password);
    // fail the log in attempt if a valid private key is not returned from decrptSecret
    if (privateKey.length !== 66) {
      setShowPrivateKeyError(true);
      authDispatch({ type: "AUTHENTICATING", payload: false });
      return;
    }

    let wallet = new ethers.Wallet(privateKey);

    const nonce = await retrieveNonce(wallet.signingKey.address);

    const signedMessage = await signMessage({ nonce, wallet });

    const jwt = await retrieveJwt({
      address: wallet.signingKey.address,
      signedMessage: signedMessage
    });

    axios
      .post(
        `https://api.consensys.space:8080/profile`,
        JSON.stringify({
          jwt: jwt,
          address: wallet.signingKey.address
        })
      )
      .then(result => {
        userDispatch({ type: "SET_USER_DATA", payload: result.data });
        userDispatch({
          type: "SET_USER_ADDRESS",
          payload: wallet.signingKey.address
        });
        userDispatch({ type: "SHOW_USER_PROFILE", payload: true });
      })
      .catch(err => console.log(err));

    authDispatch({ type: "SET_AUTH_TYPE", payload: "email" });
    authDispatch({ type: "SET_JWT", payload: jwt });
    authDispatch({ type: "AUTHENTICATING", payload: false });

    localStorage.setItem("trusat-jwt", jwt);
  };

  return (
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
