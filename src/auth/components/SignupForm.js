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
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [retypedPassword, setRetypedPassword] = useState("");
  const [understandMessage, setUnderstandMessage] = useState(false);
  const [showInvalidPasswordError, setShowInvalidPasswordError] = useState(
    false
  );
  const [showUnmatchedPasswordError, setShowUnmatchedPasswordError] = useState(
    false
  );
  // used to prompt user to either log in or claim their account
  const [isAlreadySignedUp, setIsAlreadySignedUp] = useState(false);
  const [error, setError] = useState(``);

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
      setError(``);
      setIsSuccess(false);
      authDispatch({ type: "AUTHENTICATING", payload: true });
      // create a new wallet for user
      const wallet = createWallet();
      // get unique nonce from server which will be signed by the users private key
      const nonce = await retrieveNonce({
        email: email,
        address: wallet.signingKey.address
      });
      // undefined is returned if user has already signed up with this email address
      if (nonce === undefined) {
        setIsAlreadySignedUp(true);
        authDispatch({ type: "AUTHENTICATING", payload: false });
        return;
      }
      // if false in returned instead of nonce of type string
      if (!nonce) {
        setError("log in failed as a random nonce was not received");
      }
      // sign the nonce
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
        setError(
          `Sign up has failed to send your secret to your email, please try again later`
        );
      }

      authDispatch({ type: "AUTHENTICATING", payload: false });
    } else {
      setShowInvalidPasswordError(true);
    }
  };

  return (
    <Fragment>
      <form
        className="app__form"
        name="auth-form"
        onSubmit={event => {
          event.preventDefault();
          handleSignup();
        }}
      >
        {error ? <p className="app__error-message">{error}</p> : null}

        {isAlreadySignedUp ? (
          <Fragment>
            <p className="app__error-message">
              We already have an account in our records for this email address.
              If you already created an account, please check your email inbox
              for the secret we sent you upon sign up.
            </p>
            <p className="app__error-message">
              If you have not previously signed up please go
              {` `}
              <NavLink
                className="app__nav-link app__error-message sign-up__link"
                to="/claim"
              >
                here
              </NavLink>
              {` `}to claim your account.
            </p>
          </Fragment>
        ) : null}

        <label className="app__form__label">Email</label>
        <input
          required
          className="app__form__input"
          type="email"
          onChange={event => setEmail(event.target.value)}
          value={email}
        />

        <label className="app__form__label">Password</label>
        <input
          required
          className="app__form__input"
          type="password"
          onChange={event => setPassword(event.target.value)}
          value={password}
        />
        {showInvalidPasswordError ? (
          <div className="app__form__error">
            Please choose a password that is at least 8 characters long and
            contains one number
          </div>
        ) : null}

        <div className="app__form__checkbox-and-message-wrapper">
          <input
            className="app__form__checkbox"
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

        <label className="app__form__label">Retype password to confirm</label>
        <input
          required
          className="app__form__input"
          type="password"
          onChange={event => setRetypedPassword(event.target.value)}
          value={retypedPassword}
        />
        {showUnmatchedPasswordError ? (
          <div className="app__form__error">
            The passwords you have entered do not match
          </div>
        ) : null}

        <div className="app__form__button-wrapper">
          <NavLink className="app__nav-link" to="/">
            <span className="app__form__button--cancel">Cancel</span>
          </NavLink>

          <button type="submit" className="app__form__button--white">
            {isAuthenticating ? `...Loading` : `Sign Up`}
          </button>
        </div>

        <div className="app__form__link-to-login-wrapper">
          <p>Already a member?</p>
          <NavLink className="app__nav-link" to="/login">
            <p className="app__form__log-in-text">Log in</p>
          </NavLink>
        </div>
      </form>
    </Fragment>
  );
}
