import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import axios from "axios";
import {
  createWallet,
  retrieveNonce,
  signMessage,
  retrieveJwt,
  createSecret
} from "../helpers/";
import { useAuthState, useAuthDispatch } from "../auth-context";
import { useUserDispatch } from "../../user/user-context";

export default function SignupForm() {
  const { isAuthenticating, isAuth } = useAuthState();
  const authDispatch = useAuthDispatch();
  const userDispatch = useUserDispatch();
  const [email, setEmail] = useState("bobthecryptonoob@gmail.com");
  const [password, setPassword] = useState("Zn48&NJFLPjr");
  const [understandMessage, setUnderstandMessage] = useState(false);
  const [retypedPassword, setRetypedPassword] = useState("");

  // TODO - error handling in the UI
  const emailSecret = secret => {
    axios
      .post(
        `https://api.consensys.space:8080/emailSecret`,
        JSON.stringify({ to: email, payload: secret })
      )
      .then(result => {
        // TODO - ask kenan if this result should omit the secret in return for security reasons
        console.log(result);
      })
      .catch(err => console.log(err));
  };

  // TO DO - add Formik to take care of this
  const handleFormValidation = () => {};

  const handleSignup = async () => {
    authDispatch({ type: "AUTHENTICATING", payload: true });

    const wallet = await createWallet();

    const nonce = await retrieveNonce(wallet.signingKey.address);

    const signedMessage = await signMessage({ nonce, wallet });

    const jwt = await retrieveJwt({
      address: wallet.signingKey.address,
      signedMessage: signedMessage
    });
    console.log(`jwt =`, jwt);

    // TODO - do we want to persis the wallet used when signinup/logging in with email/password
    // dispatch({ type: "SET_BURNER", payload: wallet });
    authDispatch({ type: "SET_AUTH_TYPE", payload: "email" });
    authDispatch({ type: "SET_JWT", payload: jwt });
    authDispatch({ type: "AUTHENTICATED", payload: true });
    authDispatch({ type: "AUTHENTICATING", payload: false });

    // add jwt and address to local storage
    localStorage.setItem("trusat-jwt", jwt);

    const secret = createSecret(wallet.signingKey.privateKey, password);
    console.log(`address = `, wallet.address);
    console.log(`secret = `, secret);
    // TODO - email secret to the user
    emailSecret(secret);

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
  };

  return (
    <form
      className="email-form"
      name="auth-form"
      onSubmit={event => event.preventDefault()}
    >
      <label className="email-form__label">Email</label>
      <input
        className="email-form__input"
        required
        type="email"
        onChange={event => setEmail(event.target.value)}
        value={email}
      />

      <label className="email-form__label">Password</label>
      <input
        className="email-form__input"
        required
        type="password"
        onChange={event => setPassword(event.target.value)}
        value={password}
      />

      <div className="email-form__checkbox-and-message-wrapper">
        <input
          required
          type="checkbox"
          checked={understandMessage}
          onChange={() => setUnderstandMessage(!understandMessage)}
        ></input>
        <p>
          I understand I cannot change this password in the future, and that
          TruSat cannot restore this passsword for me. I've saved it somewhere
          safe.
        </p>
      </div>

      <label className="email-form__label">Retype password to confirm</label>
      <input
        className="email-form__input"
        required
        type="password"
        onChange={event => setRetypedPassword(event.target.value)}
        value={retypedPassword}
      />

      <div className="email-form__button-wrapper">
        <NavLink style={{ textDecoration: "none", color: "white" }} to="/">
          <span className="email-form__button--black">Cancel</span>
        </NavLink>

        <span className="email-form__button--white" onClick={handleSignup}>
          {isAuthenticating ? `...Loading` : `Sign Up`}
        </span>
      </div>

      <div className="email-form__link-to-login-wrapper">
        <p>Already a member?</p>
        <NavLink style={{ color: "white", marginTop: "1em" }} to="/login">
          Log in
        </NavLink>
      </div>
    </form>
  );
}
