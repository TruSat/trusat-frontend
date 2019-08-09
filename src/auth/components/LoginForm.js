import React, { useState } from "react";
import { useAuthState, useAuthDispatch } from "../auth-context";
import { retrieveNonce, signMessage, retrieveJwt } from "../helpers/";

export default function LoginForm() {
  const { isAuthenticating } = useAuthState();
  const dispatch = useAuthDispatch();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [encryptedWallet, setEncryptedWallet] = useState("");

  const handleLogin = async () => {
    dispatch({ type: "AUTHENTICATING", payload: true });
    // TO DO
    // decrypt the wallet using the users password
    const wallet = {};
    console.log(`wallet = `, wallet);

    const nonce = await retrieveNonce(wallet.signingKey.address);
    console.log(`nonce = ${nonce}`);

    const signedMessage = await signMessage({ nonce, wallet });
    console.log(`signed message = `, signedMessage);

    const jwt = await retrieveJwt({
      publicAddress: wallet.signingKey.address,
      signedMessage: signedMessage
    });
    console.log(`jwt =`, jwt);

    // dispatch({ type: "SET_BURNER", payload: wallet });
    dispatch({
      type: "SET_ADDRESS",
      payload: wallet.signingKey.address
    });
    dispatch({ type: "SET_AUTH_TYPE", payload: "email" });
    dispatch({ type: "SET_JWT", payload: jwt });
    dispatch({ type: "AUTHENTICATED", payload: true });
    dispatch({ type: "AUTHENTICATING", payload: false });

    // add jwt to local storage
    localStorage.setItem("mvp-jwt", jwt);
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
        Wallet:
        <input
          type="text"
          onChange={event => setEncryptedWallet(event.target.value)}
          value={encryptedWallet}
        />
      </label>

      <span onClick={handleLogin}>
        {isAuthenticating ? `...Loading` : `Login`}
      </span>
    </form>
  );
}
