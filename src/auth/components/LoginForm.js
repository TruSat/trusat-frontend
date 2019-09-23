import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import { ethers } from "ethers";
import { useAuthState, useAuthDispatch } from "../auth-context";
import { useUserDispatch } from "../../user/user-context";
import { retrieveNonce, signMessage, retrieveJwt } from "../helpers/";
import { decryptSecret } from "../helpers";
import axios from "axios";
import { API_ROOT } from "../../app/helpers";

export default function LoginForm() {
  const { isAuthenticating } = useAuthState();
  const authDispatch = useAuthDispatch();
  const userDispatch = useUserDispatch();
  const [email, setEmail] = useState("bobthecryptonoob@gmail.com");
  const [password, setPassword] = useState("Zn48&NJFLPjr");
  const [secret, setSecret] = useState(
    "3005657919/5ed29f8c52656f771b35b037245bd3a1/672859aab2a336937e48e58c27226aac4b747475f59c67d38c2f3dbdf48e75b751b22a7be955a23018b30cde21079e79546fc1f362f7d812fd2c6f18a7b74e5cf486eff78710a5d0b33e3fdf516cfaf8"
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

    const signedMessage = signMessage({ nonce, wallet });

    const jwt = await retrieveJwt({
      address: wallet.signingKey.address,
      signedMessage: signedMessage
    });

    await axios
      .post(
        `${API_ROOT}/profile`,
        JSON.stringify({
          jwt: jwt,
          address: wallet.signingKey.address
        })
      )
      .then(result => {
        userDispatch({ type: "SET_USER_DATA", payload: result.data });
        authDispatch({
          type: "SET_USER_ADDRESS",
          payload: wallet.signingKey.address
        });
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
