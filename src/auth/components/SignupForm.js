import React, { useState } from "react";
import {
  createWallet,
  retrieveNonce,
  signMessage,
  retrieveJwt
} from "../helpers/";
import { useAuthState, useAuthDispatch } from "../auth-context";
import pbkdf2 from "pbkdf2";
import aesjs from "aes-js";
import base64js from "base64-js";

export default function SignupForm() {
  const { isAuthenticating } = useAuthState();
  const dispatch = useAuthDispatch();
  const [email, setEmail] = useState("bob@cryptonoob.com");
  const [password, setPassword] = useState("123456789");

  const handleSignup = async () => {
    dispatch({ type: "AUTHENTICATING", payload: true });

    const wallet = await createWallet();
    // console.log(`wallet = `, wallet);

    // const nonce = await retrieveNonce(wallet.signingKey.address);
    // console.log(`nonce = ${nonce}`);

    // const signedMessage = await signMessage({ nonce, wallet });
    // console.log(`signed message = `, signedMessage);

    // const jwt = await retrieveJwt({
    //   publicAddress: wallet.signingKey.address,
    //   signedMessage: signedMessage
    // });
    // console.log(`jwt =`, jwt);

    // // dispatch({ type: "SET_BURNER", payload: wallet });
    // dispatch({
    //   type: "SET_ADDRESS",
    //   payload: wallet.signingKey.address
    // });
    // dispatch({ type: "SET_AUTH_TYPE", payload: "email" });
    // dispatch({ type: "SET_JWT", payload: jwt });
    // dispatch({ type: "AUTHENTICATED", payload: true });
    // dispatch({ type: "AUTHENTICATING", payload: false });

    // // add jwt to local storage
    // localStorage.setItem("mvp-jwt", jwt);

    createSecret(wallet.signingKey.privateKey);
    // TODO
    // encrypt wallet with users password and email to them
    // create 16 byte iv with crypto, and convert to base64
    // convert all three to base64 independently and then combine them as one big string
    // encryptedMessafe,salt,iv
  };

  const createSecret = privateKey => {
    console.log(`privateKey to encrypt = `, privateKey);
    /*----------
    ENCRYPT
    ----------*/
    const saltArray = new Uint32Array(1);
    const salt = window.crypto.getRandomValues(saltArray)[0].toString();
    // console.log(`salt = `, salt);

    const key = pbkdf2.pbkdf2Sync(password, salt, 1, 256 / 8, "sha512");
    // console.log(`key =`, key);

    const ivArray = new Uint8Array(16);
    const iv = window.crypto.getRandomValues(ivArray);
    // console.log(`iv =`, iv);

    const padArray = new Uint32Array(2);
    const pad = window.crypto
      .getRandomValues(padArray)
      .join("")
      .substring(0, 14);
    // console.log(`pad = `, pad);

    const privateKeyBytes = aesjs.utils.utf8.toBytes(`${pad}${privateKey}`);
    // console.log(`privateKeyBytes =`, privateKeyBytes);

    const aesCbc = new aesjs.ModeOfOperation.cbc(key, iv);
    // console.log(`aesCbc =`, aesCbc);

    const encryptedPrivateKeyBytes = aesCbc.encrypt(privateKeyBytes);
    const encryptedPrivateKeyBytesAsHex = aesjs.utils.hex.fromBytes(
      encryptedPrivateKeyBytes
    );
    // console.log(
    //   `encryptedPrivateKeyBytesAsHex =`,
    //   encryptedPrivateKeyBytesAsHex
    // );

    const saltAsByte64String = base64js.fromByteArray(salt);
    // console.log(`saltAsBase64String = `, saltAsByte64String);

    const ivAsByte64String = base64js.fromByteArray(iv);
    // console.log(`ivAsBytes64String = `, ivAsByte64String);

    // const encryptedPrivateKeyBytesAsHexAsByte64String = base64js.fromByteArray(
    //   encryptedPrivateKeyBytesAsHex
    // );
    // console.log(
    //   `encryptedPrivateKeyBytesAsHexAsByte64String = `,
    //   encryptedPrivateKeyBytesAsHexAsByte64String
    // );

    const secretToEmail = `${saltAsByte64String},${ivAsByte64String},${encryptedPrivateKeyBytesAsHex}`;
    console.log(`secretToEmail = `, secretToEmail);

    return decryptSecret(secretToEmail);
  };

  const decryptSecret = secret => {
    /*----------
    DECRYPT
    ----------*/
    const splitSecret = secret.split(",");
    // console.log(splitSecret);

    const salt = base64js.toByteArray(splitSecret[0]).join("");
    // console.log(`salt = `, salt);

    const iv = base64js.toByteArray(splitSecret[1]);
    // console.log(`iv =`, iv);

    const encryptedPrivateKeyBytesAsHex = splitSecret[2];
    // console.log(
    //   `encryptedPrivateKeyBytesAsHex = `,
    //   encryptedPrivateKeyBytesAsHex
    // );

    const key = pbkdf2.pbkdf2Sync(password, salt, 1, 256 / 8, "sha512");
    // console.log(`key =`, key);

    // When ready to decrypt the hex string, convert it back to bytes
    const encryptedPrivateKeyBytes = aesjs.utils.hex.toBytes(
      encryptedPrivateKeyBytesAsHex
    );

    const aesCbc = new aesjs.ModeOfOperation.cbc(key, iv);

    const decryptedPrivateKeyBytes = aesCbc.decrypt(encryptedPrivateKeyBytes);

    // Convert our bytes back into text
    const decryptedPrivateKeyWithPad = aesjs.utils.utf8.fromBytes(
      decryptedPrivateKeyBytes
    );

    const privateKey = decryptedPrivateKeyWithPad.substring(
      14,
      decryptedPrivateKeyWithPad.length
    );

    console.log(`decrypted private key = `, privateKey);
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

      <span onClick={handleSignup}>
        {isAuthenticating ? `...Loading` : `Sign Up`}
      </span>
    </form>
  );
}
