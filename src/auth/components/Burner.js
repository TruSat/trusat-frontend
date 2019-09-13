import React from "react";
import {
  createWallet,
  retrieveNonce,
  signMessage,
  retrieveJwt
} from "../helpers/";
import { useAuthState, useAuthDispatch } from "../auth-context";
import { useUserDispatch } from "../../user/user-context";

export default function Burner() {
  const { isAuthenticating } = useAuthState();
  const authDispatch = useAuthDispatch();
  const userDispatch = useUserDispatch();

  const handleLogin = async () => {
    authDispatch({ type: "AUTHENTICATING", payload: true });

    const wallet = await createWallet();
    console.log(`wallet = `, wallet);

    const nonce = await retrieveNonce(wallet.signingKey.address);
    console.log(`nonce = ${nonce}`);

    const signedMessage = await signMessage({ nonce, wallet });
    console.log(`signed message = `, signedMessage);

    const jwt = await retrieveJwt({
      address: wallet.signingKey.address,
      signedMessage: signedMessage
    });
    console.log(`jwt =`, jwt);

    authDispatch({ type: "SET_BURNER", payload: wallet });
    authDispatch({ type: "SET_AUTH_TYPE", payload: "burner" });
    authDispatch({ type: "SET_JWT", payload: jwt });
    authDispatch({ type: "AUTHENTICATED", payload: true });
    authDispatch({ type: "AUTHENTICATING", payload: false });

    userDispatch({
      type: "SET_USER_ADDRESS",
      payload: wallet.signingKey.address
    });

    // add private key and jwt to local storage
    const privateKey = wallet.signingKey.privateKey;
    localStorage.setItem("trusat-private-key", privateKey);
    localStorage.setItem("trusat-jwt", jwt);
  };

  return (
    <span onClick={handleLogin}>
      {isAuthenticating ? `...Loading` : `skip for now`}
    </span>
  );
}
