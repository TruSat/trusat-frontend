import React, { useState } from "react";
import { useTrusatPostApi } from "../app/app-helpers";
import Spinner from "../app/components/Spinner";
import ReactGA from "react-ga";

export default function ClaimAccount() {
  ReactGA.pageview(window.location.pathname + window.location.search);

  const [email, setEmail] = useState("bobthecryptonoob@gmail.com");
  const [{ isLoading, isError, data }, doPost, withData] = useTrusatPostApi();
  const [isSuccess, setIsSuccess] = useState(false);

  const claimAccount = async () => {
    await doPost(`/claimAccount`);
    await withData(
      JSON.stringify({
        email: email
      })
    );
    setEmail("");

    if (data && !isError) {
      setIsSuccess(true);
    }
  };

  return isLoading ? (
    <Spinner />
  ) : (
    <div className="claim-account__wrapper">
      <h1 className="claim-account__header">Claim Account</h1>
      <form
        className="email-form"
        onSubmit={event => {
          event.preventDefault();
          claimAccount();
        }}
      >
        <label className="email-form__label">EMAIL</label>
        <input
          required
          className="email-form__input"
          type="email"
          onChange={event => setEmail(event.target.value)}
          value={email}
        ></input>
        <button className="app__white-button--small">Submit</button>
      </form>
      {isSuccess ? (
        <p className="claim-account__message">
          Check your email for further instructions!
        </p>
      ) : null}
      {isError ? (
        <p className="app__error-message">Something went wrong...</p>
      ) : null}
    </div>
  );
}
