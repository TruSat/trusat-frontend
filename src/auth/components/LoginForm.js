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
      name="auth-form"
      onSubmit={event => event.preventDefault()}
    >
      <label>
        Email:
        <input
          required
          type="email"
          onChange={event => setEmail(event.target.value)}
          value={email}
        />
      </label>

      <label>
        Password:
        <input
          required
          type="password"
          onChange={event => setPassword(event.target.value)}
          value={password}
        />
      </label>

      <label>
        Secret:
        <input
          type="text"
          onChange={event => setSecret(event.target.value)}
          value={secret}
        />
      </label>

      <span onClick={handleLogin}>
        {isAuthenticating ? `...Loading` : `Log in`}
      </span>

      <NavLink to="/signup">
        <label>
          Not a member yet?
          <span>Sign up</span>
        </label>
      </NavLink>
    </form>
  );
}
