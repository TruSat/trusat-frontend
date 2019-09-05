import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import { ethers } from "ethers";
import { useAuthState, useAuthDispatch } from "../auth-context";
import { retrieveNonce, signMessage, retrieveJwt } from "../helpers/";
import { decryptSecret } from "../helpers";

export default function LoginForm() {
  const { isAuthenticating } = useAuthState();
  const dispatch = useAuthDispatch();
  const [email, setEmail] = useState("bobthecryptonoob@gmail.com");
  const [password, setPassword] = useState("Zn48&NJFLPjr");
  const [secret, setSecret] = useState("");

  // TO DO - error handling in the UI
  const handleLogin = async () => {
    dispatch({ type: "AUTHENTICATING", payload: true });
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

    // TODO - do we want to persis the wallet used when signinup/logging in with email/password
    // dispatch({ type: "SET_BURNER", payload: wallet });
    dispatch({
      type: "SET_ADDRESS",
      payload: wallet.signingKey.address
    });
    dispatch({ type: "SET_AUTH_TYPE", payload: "email" });
    dispatch({ type: "SET_JWT", payload: jwt });
    dispatch({ type: "AUTHENTICATED", payload: true });
    dispatch({ type: "AUTHENTICATING", payload: false });

    // add jwt and address to local storage
    localStorage.setItem("trusat-jwt", jwt);
    localStorage.setItem("trusat-address", wallet.signingKey.address);
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
        <NavLink style={{ textDecoration: "none", color: "white" }} to="/">
          <span className="email-form__button--black">Cancel</span>
        </NavLink>
        <span className="email-form__button--white" onClick={handleLogin}>
          {isAuthenticating ? `...Loading` : `Log in`}
        </span>
      </div>

      <div className="email-form__link-to-login-wrapper">
        <p>Dont' have an account?</p>
        <NavLink style={{ color: "white", marginTop: "1em" }} to="/signup">
          Sign up
        </NavLink>
      </div>
    </form>
  );
}
