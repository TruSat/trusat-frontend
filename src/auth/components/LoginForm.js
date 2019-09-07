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
  const [secret, setSecret] = useState("");

  // TO DO - error handling in the UI
  const handleLogin = async () => {
    authDispatch({ type: "AUTHENTICATING", payload: true });
    console.log(`secret = `, secret);

    const privateKey = await decryptSecret(secret, password);
    console.log(`privateKey = `, privateKey);

    let wallet = new ethers.Wallet(privateKey);
    console.log(`wallet = `, wallet);
    console.log(`address = `, wallet.signingKey.address);

    const nonce = await retrieveNonce(wallet.signingKey.address);
    console.log(`nonce = ${nonce}`);

    const signedMessage = await signMessage({ nonce, wallet });
    console.log(`signed message = `, signedMessage);

    const jwt = await retrieveJwt({
      address: wallet.signingKey.address,
      signedMessage: signedMessage
    });
    console.log(`jwt =`, jwt);

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
    authDispatch({ type: "AUTHENTICATED", payload: true });
    authDispatch({ type: "AUTHENTICATING", payload: false });

    localStorage.setItem("trusat-jwt", jwt);
  };

  return (
    <form
      className="email-form"
      name="email-form"
      onSubmit={event => event.preventDefault()}
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
        type="text"
        className="email-form__input"
        onChange={event => setSecret(event.target.value)}
        value={secret}
      />

      <div className="email-form__button-wrapper">
        <NavLink className="app__nav-link" to="/">
          <span className="email-form__button--black">Cancel</span>
        </NavLink>
        <span className="email-form__button--white" onClick={handleLogin}>
          {isAuthenticating ? `...Loading` : `Log in`}
        </span>
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
