import React from "react";
import {
  createWallet,
  retrieveNonce,
  signMessage,
  retrieveJwt
} from "../helpers/";
import { useAuthState, useAuthDispatch } from "../auth-context";

export default function Burner() {
  const { isAuthenticating } = useAuthState();
  const dispatch = useAuthDispatch();

  const handleLogin = async () => {
    dispatch({ type: "AUTHENTICATING", payload: true });

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

    dispatch({ type: "SET_BURNER", payload: wallet });
    // dispatch({
    //   type: "SET_ADDRESS",
    //   payload: wallet.signingKey.address
    // });
    dispatch({ type: "SET_AUTH_TYPE", payload: "burner" });
    dispatch({ type: "SET_JWT", payload: jwt });
    dispatch({ type: "AUTHENTICATED", payload: true });
    dispatch({ type: "AUTHENTICATING", payload: false });

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
