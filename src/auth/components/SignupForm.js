import React, { useState, Fragment } from "react";
import { NavLink } from "react-router-dom";
import {
  isValidPassword,
  createWallet,
  retrieveNonce,
  signMessage,
  signUp,
  createSecret
} from "../auth-helpers";
import { useAuthState, useAuthDispatch } from "../auth-context";

export default function SignupForm({ setIsSuccess }) {
  const authDispatch = useAuthDispatch();
  const { isAuthenticating } = useAuthState();
  const [email, setEmail] = useState("bobthecryptonoob@gmail.com");
  const [password, setPassword] = useState("helloworld123");
  const [retypedPassword, setRetypedPassword] = useState("helloworld123");
  const [understandMessage, setUnderstandMessage] = useState(false);
  const [showInvalidPasswordError, setShowInvalidPasswordError] = useState(
    false
  );
  const [showUnmatchedPasswordError, setShowUnmatchedPasswordError] = useState(
    false
  );
  const [isError, setIsError] = useState(false);

  const handleFormValidation = () => {
    setShowInvalidPasswordError(false);
    setShowUnmatchedPasswordError(false);

    if (!isValidPassword(password)) {
      setShowInvalidPasswordError(true);
      return false;
    }
    // check that password and retyped password have same value
    if (password !== retypedPassword) {
      setShowUnmatchedPasswordError(true);
      return false;
    }
    // two checks have passed
    return true;
  };

  const handleSignup = async () => {
    const inputsAreValid = handleFormValidation();

    if (inputsAreValid) {
      setIsError(false);
      authDispatch({ type: "AUTHENTICATING", payload: true });
      // create a new wallet for user
      const wallet = createWallet();
      // get unique nonce from server which will be signed by the users private key
      const nonce = await retrieveNonce(wallet.signingKey.address);
      // signed nonce
      const signedMessage = signMessage({ nonce, wallet });
      // encrypt wallet with users private key
      const secret = createSecret(wallet.signingKey.privateKey, password);
      // sends email to user with a "secret" that will be used to log in
      const signUpSuccess = await signUp({
        email: email,
        address: wallet.signingKey.address,
        signedMessage: signedMessage,
        secret: secret
      });
      // If secret is emailed, direct user to their email account to verify ownership
      if (signUpSuccess) {
        setIsSuccess(true);
      } else {
        setIsError(true);
      }

      authDispatch({ type: "AUTHENTICATING", payload: false });
    } else {
      setShowInvalidPasswordError(true);
    }
  };

  return (
    <Fragment>
      <form
        className="email-form"
        name="auth-form"
        onSubmit={event => {
          event.preventDefault();
          handleSignup();
        }}
      >
        <label className="email-form__label">Email</label>
        <input
          required
          className="email-form__input"
          type="email"
          onChange={event => setEmail(event.target.value)}
          value={email}
        />

        <label className="email-form__label">Password</label>
        <input
          required
          className="email-form__input"
          type="password"
          onChange={event => setPassword(event.target.value)}
          value={password}
        />
        {showInvalidPasswordError ? (
          <div className="email-form__error">
            Please choose a password that is at least 8 characters long and
            contains one number
          </div>
        ) : null}

        <div className="email-form__checkbox-and-message-wrapper">
          <input
            required
            type="checkbox"
            checked={understandMessage}
            onChange={() => setUnderstandMessage(!understandMessage)}
          ></input>
          <p>
            I understand I cannot change this password in the future, and that
            TruSat cannot restore this password for me. I've saved it somewhere
            safe.
          </p>
        </div>

        <label className="email-form__label">Retype password to confirm</label>
        <input
          required
          className="email-form__input"
          type="password"
          onChange={event => setRetypedPassword(event.target.value)}
          value={retypedPassword}
        />
        {showUnmatchedPasswordError ? (
          <div className="email-form__error">
            The passwords you have entered do not match
          </div>
        ) : null}

        <div className="email-form__button-wrapper">
          <NavLink className="app__nav-link" to="/">
            <span className="email-form__button--black">Cancel</span>
          </NavLink>

          <button type="submit" className="email-form__button--white">
            {isAuthenticating ? `...Loading` : `Sign Up`}
          </button>
        </div>

        <div className="email-form__link-to-login-wrapper">
          <p>Already a member?</p>
          <NavLink className="app__nav-link" to="/login">
            <p className="email-form__log-in-text">Log in</p>
          </NavLink>
        </div>
      </form>
      {isError ? (
        <p className="app__error-message">Something went wrong ...</p>
      ) : null}
    </Fragment>
  );
}
